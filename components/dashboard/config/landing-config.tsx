"use client";

import { useState } from "react";
import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultContact, type ContactInfo } from "@/lib/site";

const campos: {
  key: keyof ContactInfo;
  label: string;
  hint?: string;
  multiline?: boolean;
}[] = [
  { key: "whatsapp", label: "WhatsApp", hint: "Formato: +58 424-1543269" },
  { key: "instagram", label: "Instagram (URL)" },
  { key: "email", label: "Correo" },
  { key: "address", label: "Dirección de oficinas", multiline: true },
  { key: "reference", label: "Punto de referencia", multiline: true },
  { key: "parking", label: "Estacionamiento" },
  { key: "mapsUrl", label: "Enlace de Google Maps" },
];

export function LandingConfig() {
  const [form, setForm] = useState<ContactInfo>(defaultContact);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof ContactInfo, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-lg border border-brand-blue/20 bg-brand-tint px-4 py-3 text-sm text-brand-navy">
        <Info className="mt-0.5 size-4 shrink-0 text-brand-blue" />
        <p>
          Estos datos se muestran en el landing (contacto, pie de página y
          sección de cómo llegar).
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="max-w-2xl space-y-5 rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6"
      >
        {campos.map((c) => (
          <div key={c.key} className="grid gap-2">
            <Label htmlFor={c.key}>{c.label}</Label>
            {c.multiline ? (
              <Textarea
                id={c.key}
                rows={2}
                value={form[c.key]}
                onChange={(e) => update(c.key, e.target.value)}
                className="shadow-xs"
              />
            ) : (
              <Input
                id={c.key}
                value={form[c.key]}
                onChange={(e) => update(c.key, e.target.value)}
                className="shadow-xs"
              />
            )}
            {c.hint && <p className="text-xs text-muted-foreground">{c.hint}</p>}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            className="bg-brand-navy text-white shadow-md hover:bg-brand-navy/90"
          >
            Guardar cambios
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-status-ok">
              <Check className="size-4" />
              Guardado
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
