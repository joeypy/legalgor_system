"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/features/identity/auth-client";

export function TwoFactorDisablePanel() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function onDisable() {
    setPending(true);
    setError(null);
    const { error: failure } = await authClient.twoFactor.disable({
      password,
    });
    setPending(false);
    if (failure) {
      setError("No se pudo desactivar. Verifique su contraseña.");
      return;
    }
    setPassword("");
    setConfirming(false);
    router.refresh();
  }

  if (!confirming) {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="space-y-1">
            <p className="font-medium text-brand-navy">
              La verificación en dos pasos está activa
            </p>
            <p className="text-sm text-muted-foreground">
              Protege su cuenta aunque alguien conozca la contraseña.{" "}
              <strong className="font-medium text-foreground">
                No se recomienda desactivarla.
              </strong>
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10"
          onClick={() => setConfirming(true)}
        >
          Desactivar 2FA (no recomendado)
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-destructive/30 bg-card p-5">
      <p className="text-sm text-muted-foreground">
        Al desactivar 2FA, su cuenta queda más expuesta. Confirme con su
        contraseña solo si está seguro.
      </p>
      <div className="grid gap-2">
        <Label htmlFor="disable-2fa-password">Contraseña actual</Label>
        <Input
          id="disable-2fa-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11"
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="destructive"
          disabled={pending || password.length < 8}
          onClick={() => void onDisable()}
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Confirmar desactivación"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={pending}
          onClick={() => {
            setConfirming(false);
            setPassword("");
            setError(null);
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
