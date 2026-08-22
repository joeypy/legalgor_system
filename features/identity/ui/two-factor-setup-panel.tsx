"use client";

import { Check, Copy, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/features/identity/auth-client";
import { adminPaths } from "@/lib/app-paths";
import { parseTotpCode } from "@/features/identity/otp";
import { TotpCodeInput } from "@/features/identity/ui/totp-code-input";

type Step =
  | { phase: "password" }
  | { phase: "scan"; uri: string; backup: string[] }
  | { phase: "backup"; codes: string[] };

function secretFrom(uri: string) {
  try {
    return new URL(uri).searchParams.get("secret");
  } catch {
    return null;
  }
}

export function TwoFactorSetupPanel({
  alreadyEnabled,
  nextPath = adminPaths.dashboard,
  doneLabel = "Continuar al panel",
}: {
  alreadyEnabled: boolean;
  nextPath?: string;
  doneLabel?: string;
}) {
  const router = useRouter();
  const errorId = useId();
  const verifyingRef = useRef(false);
  const [step, setStep] = useState<Step>({ phase: "password" });
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (alreadyEnabled) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
        <ShieldCheck className="size-8 text-status-ok" />
        <p className="font-medium">La verificación en dos pasos ya está activa.</p>
        <Button className="bg-brand-navy" onClick={() => router.push(nextPath)}>
          Ir al panel
        </Button>
      </div>
    );
  }

  async function startEnable() {
    setPending(true);
    setError(null);
    const { data, error: failure } = await authClient.twoFactor.enable({
      password,
    });
    setPending(false);
    if (failure || !data || !("totpURI" in data) || !data.totpURI) {
      setError("Esa no es su contraseña.");
      return;
    }
    setStep({
      phase: "scan",
      uri: data.totpURI,
      backup: data.backupCodes ?? [],
    });
    setPassword("");
  }

  async function confirmTotp(raw: string) {
    if (step.phase !== "scan" || verifyingRef.current) return;

    const parsed = parseTotpCode(raw);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    verifyingRef.current = true;
    setPending(true);
    setError(null);

    const { error: failure } = await authClient.twoFactor.verifyTotp({
      code: parsed.code,
    });

    if (failure) {
      setError(
        "El código no coincide. Espere al siguiente código (cambian cada 30 s).",
      );
      setCode("");
      setAttempt((n) => n + 1);
      setPending(false);
      verifyingRef.current = false;
      return;
    }

    setStep({ phase: "backup", codes: step.backup });
  }

  if (step.phase === "backup") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Guarde estos códigos de respaldo en un lugar seguro. Solo se muestran
          una vez. Si pierde el teléfono, son su única vía de acceso.
        </p>
        <ul className="grid gap-1 rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm">
          {step.codes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText(step.codes.join("\n"));
            setCopied(true);
          }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copiar códigos
        </Button>
        <Button
          className="bg-brand-navy"
          onClick={() => {
            router.push(nextPath);
            router.refresh();
          }}
        >
          {doneLabel}
        </Button>
      </div>
    );
  }

  if (step.phase === "scan") {
    const secret = secretFrom(step.uri);
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Escanee este código con Google Authenticator, 1Password, Authy u otra
          app TOTP. Luego escriba el código de 6 dígitos para activar la
          protección.
        </p>
        <div className="mx-auto rounded-xl bg-white p-4">
          <QRCodeSVG value={step.uri} size={200} />
        </div>
        {secret ? (
          <p className="break-all text-center font-mono text-xs text-muted-foreground">
            Clave manual: {secret}
          </p>
        ) : null}
        <TotpCodeInput
          key={attempt}
          id="confirm-otp"
          label="Código de verificación"
          value={code}
          onChange={(next) => {
            setCode(next);
            if (error) setError(null);
          }}
          onComplete={(value) => void confirmTotp(value)}
          disabled={pending}
          invalid={Boolean(error)}
          autoFocus
          describedBy={error ? errorId : undefined}
        />
        {error ? (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          className="bg-brand-navy"
          disabled={pending}
          onClick={() => void confirmTotp(code)}
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : "Activar 2FA"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Para proteger el panel admin debe activar un autenticador. Confirme su
        contraseña para generar el código QR.
      </p>
      <div className="grid gap-2">
        <Label htmlFor="current-password">Contraseña actual</Label>
        <Input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11"
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button
        className="bg-brand-navy"
        disabled={pending || password.length < 8}
        onClick={startEnable}
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Generar QR"}
      </Button>
    </div>
  );
}
