/** URL paths on admin.* — no /admin prefix in the browser. */
export const adminPaths = {
  home: "/",
  entrar: "/entrar",
  setup2fa: "/setup-2fa",
  dashboard: "/dashboard",
  chats: "/chats",
  vencimientos: "/vencimientos",
  clientes: "/clientes",
  tramites: "/tramites",
  servicios: "/servicios",
  configuracion: "/configuracion",
} as const;

/** URL paths on plataforma.* — no /plataforma prefix in the browser. */
export const platformPaths = {
  home: "/",
  entrar: "/entrar",
  ajustes: "/ajustes",
} as const;
