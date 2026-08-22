import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/chats",
        "/clientes",
        "/tramites",
        "/vencimientos",
        "/servicios",
        "/configuracion",
        "/api/",
        "/entrar",
        "/setup-2fa",
        "/ajustes",
      ],
    },
    sitemap: "https://grupolegalgor.com/sitemap.xml",
    host: "https://grupolegalgor.com",
  };
}
