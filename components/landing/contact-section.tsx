"use client";

import { useState } from "react";
import { Mail, Navigation, Send } from "lucide-react";

import { InstagramIcon, WhatsappIcon } from "@/components/brand/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceLines } from "@/features/servicios/data";
import {
  directionsUrl,
  instagramHandle,
  siteConfig,
  whatsappUrl,
} from "@/lib/site";
import { Reveal } from "./motion-primitives";

const opciones = [
  ...serviceLines.map((l) => ({ value: l.slug, label: l.title })),
  { value: "paquetes-registro", label: "Paquetes de registro" },
];

export function ContactSection() {
  const { contact } = siteConfig;
  const [servicio, setServicio] = useState("");

  const canales = [
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      value: contact.whatsapp,
      href: whatsappUrl(),
      accent: true,
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: instagramHandle(),
      href: contact.instagram,
    },
    {
      icon: Mail,
      label: "Correo",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = String(form.get("name") ?? "");
    const mensaje = String(form.get("message") ?? "");
    const etiqueta =
      opciones.find((o) => o.value === servicio)?.label ?? "asesoría";
    const texto = `Hola LegalGor, soy ${nombre}. Me interesa: ${etiqueta}.${
      mensaje ? ` ${mensaje}` : ""
    }`;
    window.open(whatsappUrl(undefined, texto), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="bg-brand-tint py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="inline-flex items-center rounded-full bg-brand-navy px-6 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-sm">
              Contacto
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Hablemos de tu empresa
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Escríbenos por el canal que prefieras o déjanos tus datos y te
              contactamos.
            </p>

            <ul className="mt-8 space-y-3">
              {canales.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className={
                        c.accent
                          ? "grid size-11 place-items-center rounded-lg bg-brand-navy text-white"
                          : "grid size-11 place-items-center rounded-lg bg-brand-tint text-brand-navy"
                      }
                    >
                      <c.icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="block truncate font-medium text-foreground">
                        {c.value}
                      </span>
                    </span>
                  </a>

                  {c.label === "WhatsApp" && (
                    <a
                      href={directionsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:gap-2.5 hover:underline"
                    >
                      <Navigation className="size-4" />
                      Cómo llegar desde tu ubicación
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-2xl sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="shadow-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    className="shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Label htmlFor="service">Servicio de interés</Label>
                <Select value={servicio} onValueChange={setServicio}>
                  <SelectTrigger id="service" className="w-full shadow-sm">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {opciones.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                  className="shadow-sm"
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full bg-brand-navy text-white shadow-lg transition hover:bg-brand-navy/90"
              >
                <Send className="size-4" />
                Enviar por WhatsApp
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
