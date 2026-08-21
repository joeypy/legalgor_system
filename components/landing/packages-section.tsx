import { Reveal } from "./motion-primitives";
import { PackagesCarousel } from "./packages-carousel";
import { SectionPill } from "./section-pill";

export function PackagesSection() {
  return (
    <section id="paquetes" className="relative bg-background py-24 sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <SectionPill>Paquetes de registro</SectionPill>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Constituye tu compañía sin complicaciones
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Planes para constituyentes ordinarias. Arrastra el carrusel y abre el
            detalle de cada paquete.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 w-[92%] max-w-[1400px]">
        <PackagesCarousel />
      </div>
    </section>
  );
}
