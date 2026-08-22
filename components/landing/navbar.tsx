"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="LegalGor — inicio">
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-wine"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            className="rounded-full bg-brand-navy text-white hover:bg-brand-navy/90"
          >
            <a href="#contacto">Contáctenos</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-navy hover:bg-brand-tint lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-l-0 bg-white text-brand-navy">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo variant="dark" />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-2 flex flex-col gap-1 px-4">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-semibold text-brand-navy/80 transition-colors hover:bg-brand-tint hover:text-brand-wine"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#ubicacion"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-brand-navy/80 transition-colors hover:bg-brand-tint hover:text-brand-wine"
              >
                Cómo llegar
              </a>
            </nav>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Button
                asChild
                className="rounded-full bg-brand-navy text-white hover:bg-brand-navy/90"
                onClick={() => setOpen(false)}
              >
                <a href="#contacto">Contáctenos</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
