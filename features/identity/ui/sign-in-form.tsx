"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SecondFactorForm } from "@/features/identity/ui/second-factor-form";
import { authClient, signIn } from "@/features/identity/auth-client";
import { adminPaths } from "@/lib/app-paths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm({
  nextPath = adminPaths.dashboard,
  expectedRole,
}: {
  nextPath?: string;
  expectedRole?: "admin" | "user";
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [segundoFactor, setSegundoFactor] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVisible(false);
    setPending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const { data, error: failure } = await signIn.email({
      email,
      password: String(form.get("password")),
    });

    if (data && "twoFactorRedirect" in data && data.twoFactorRedirect) {
      setSegundoFactor(email);
      setPending(false);
      return;
    }

    if (failure) {
      setError("Correo o contraseña incorrectos.");
      setPending(false);
      return;
    }

    if (expectedRole && data?.user) {
      const role = (data.user as { role?: string }).role;
      const allowed =
        expectedRole === "admin"
          ? role === "admin" || role === "staff"
          : role === "user";
      if (!allowed) {
        await authClient.signOut();
        setError("Esta cuenta no tiene acceso a este portal.");
        setPending(false);
        return;
      }
    }

    const needsSetup =
      expectedRole === "admin" &&
      data?.user &&
      !(data.user as { twoFactorEnabled?: boolean }).twoFactorEnabled;

    router.push(needsSetup ? adminPaths.setup2fa : nextPath);
    router.refresh();
  }

  if (segundoFactor) {
    return <SecondFactorForm email={segundoFactor} nextPath={nextPath} />;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={8}
            className="h-11 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 bg-brand-navy">
        {pending ? <Loader2 className="size-4 animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
}
