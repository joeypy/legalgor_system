"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/features/identity/auth-client";
import { adminPaths } from "@/lib/app-paths";
import {
  BACKUP_CODE_MAX_LENGTH,
  parseBackupCode,
  parseTotpCode,
} from "@/features/identity/otp";
import { TotpCodeInput } from "@/features/identity/ui/totp-code-input";

function failureMessage(status: number | undefined, isTotp: boolean) {
  if (status === 429 || status === 403) {
    return "Demasiados intentos fallidos. Espere unos minutos e inténtelo de nuevo.";
  }
  if (isTotp) {
    return "El código no es correcto o ya venció. Los códigos cambian cada 30 segundos.";
  }
  return "Ese código de respaldo no es válido, o ya se usó.";
}

export function SecondFactorForm({
  email,
  nextPath = adminPaths.dashboard,
}: {
  email: string;
  nextPath?: string;
}) {
  const router = useRouter();
  const errorId = useId();
  const verifyingRef = useRef(false);
  const [mode, setMode] = useState<"totp" | "backup">("totp");
  const [code, setCode] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTotp = mode === "totp";

  function resetCode() {
    setCode("");
    setAttempt((n) => n + 1);
  }

  async function verify(raw: string) {
    if (verifyingRef.current) return;

    const parsed = isTotp ? parseTotpCode(raw) : parseBackupCode(raw);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    verifyingRef.current = true;
    setPending(true);
    setError(null);

    const { error: failure } = isTotp
      ? await authClient.twoFactor.verifyTotp({ code: parsed.code })
      : await authClient.twoFactor.verifyBackupCode({ code: parsed.code });

    if (failure) {
      setError(failureMessage(failure.status, isTotp));
      resetCode();
      setPending(false);
      verifyingRef.current = false;
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  function onCodeChange(next: string) {
    setCode(next);
    if (error) setError(null);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void verify(code);
      }}
      className="flex flex-col gap-4"
    >
      <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
        <p className="text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Entrando como
        </p>
        <p className="text-sm font-medium">{email}</p>
      </div>

      {isTotp ? (
        <TotpCodeInput
          key={attempt}
          id="otp"
          value={code}
          onChange={onCodeChange}
          onComplete={(value) => void verify(value)}
          disabled={pending}
          invalid={Boolean(error)}
          autoFocus
          describedBy={error ? errorId : undefined}
        />
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="backup-otp">Código de respaldo</Label>
          <Input
            id="backup-otp"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            className="h-11 font-mono tracking-widest"
            autoComplete="one-time-code"
            autoFocus
            spellCheck={false}
            maxLength={BACKUP_CODE_MAX_LENGTH}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={
              error ? `${errorId} backup-otp-hint` : "backup-otp-hint"
            }
            required
          />
          <p id="backup-otp-hint" className="text-xs text-muted-foreground">
            Uno de los códigos que guardó al activar el autenticador.
          </p>
        </div>
      )}

      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 bg-brand-navy"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Verificar"}
      </Button>

      <button
        type="button"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        onClick={() => {
          setMode(isTotp ? "backup" : "totp");
          setError(null);
          verifyingRef.current = false;
          resetCode();
        }}
      >
        {isTotp ? "Usar un código de respaldo" : "Usar el autenticador"}
      </button>
    </form>
  );
}
