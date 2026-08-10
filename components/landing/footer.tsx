import Link from "next/link";
import { MapPin } from "lucide-react";

import { InstagramIcon, WhatsappIcon } from "@/components/brand/icons";
import { Logo } from "@/components/brand/logo";
import { serviceLines } from "@/features/servicios/data";
import {
  instagramHandle,
  siteConfig,
  whatsappUrl,
} from "@/lib/site";

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="bg-brand-navy-deep text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {siteConfig.tagline}.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/65">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-sky" />
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {contact.address}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Servicios
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceLines.map((l) => (
              <li key={l.slug}>
                <a
                  href="#servicios"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                <WhatsappIcon className="size-4 text-brand-sky" />
                {contact.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                <InstagramIcon className="size-4 text-brand-sky" />
                {instagramHandle()}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="text-white/75 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <Link href="/dashboard" className="text-white/75 hover:text-white">
                Panel interno
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los
            derechos reservados.
          </p>
          <p>Hecho con compromiso para empresarios y emprendedores.</p>
        </div>
      </div>
    </footer>
  );
}
