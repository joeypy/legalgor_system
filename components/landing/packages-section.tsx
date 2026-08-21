import { Reveal } from "./motion-primitives";
import { PackagesCarousel } from "./packages-carousel";
import { WaveDivider } from "./wave-divider";

export function PackagesSection() {
  return (
    <section id="paquetes" className="relative bg-brand-navy-deep text-white">
      <div className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <Reveal className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            Paquetes de registro
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Constituye tu compañía sin complicaciones
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Planes para constituyentes ordinarias. Arrastra el carrusel y abre el
            detalle de cada paquete.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 w-[92%] max-w-[1400px]">
          <PackagesCarousel />
        </div>
      </div>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
