import { Reveal } from "./motion-primitives";
import { SectionPill } from "./section-pill";
import { PackagesCarousel } from "./packages-carousel";
import { WaveDivider } from "./wave-divider";

export function PackagesSection() {
  return (
    <section id="paquetes" className="relative bg-brand-navy-deep text-white">
      <WaveDivider fill="var(--brand-navy-deep)" flip />

      <div className="pb-10 pt-4">
        <Reveal className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
          <SectionPill className="bg-white text-brand-navy">
            Paquetes de registro
          </SectionPill>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Constituye tu compañía sin complicaciones
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Planes para constituyentes ordinarias. Arrastra el carrusel y abre el
            detalle de cada paquete.
          </p>
        </Reveal>

        {/* Wider than the rest of the content — ~90% with a cap */}
        <div className="mx-auto mt-12 w-[92%] max-w-[1400px]">
          <PackagesCarousel />
        </div>
      </div>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
