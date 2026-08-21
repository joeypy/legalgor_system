"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

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
    <section id="contacto" className="bg-brand-wine py-24 text-white sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Contacto
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Formulario de contacto
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              Completa el formulario o escríbenos por el canal que prefieras.
            </p>

            <ul className="mt-10 space-y-4">
              {canales.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl p-2 -ml-2 transition hover:bg-white/10"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition group-hover:bg-white group-hover:text-brand-wine">
                      <c.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wide text-white/55">
                        {c.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-white/90 group-hover:text-white">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-white p-6 text-foreground shadow-xl sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Label htmlFor="service">Servicio de interés</Label>
                <Select value={servicio} onValueChange={setServicio}>
                  <SelectTrigger id="service" className="w-full rounded-xl">
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
                  rows={5}
                  placeholder="¿En qué podemos ayudarte?"
                  className="rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full rounded-full bg-brand-wine text-white hover:bg-brand-wine-bright"
              >
                <Send className="size-4" />
                Enviar
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
