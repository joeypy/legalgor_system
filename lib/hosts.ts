export const hosts = {
  apex: "grupolegalgor.com",
  www: "www.grupolegalgor.com",
  admin: "admin.grupolegalgor.com",
  plataforma: "plataforma.grupolegalgor.com",
} as const;

export type HostKind =
  | "marketing"
  | "www"
  | "admin"
  | "plataforma"
  | "unknown";

export function resolveHostKind(host: string): HostKind {
  const h = host.toLowerCase();
  if (h === hosts.www || h === `www.localhost`) return "www";
  if (
    h === hosts.admin ||
    h === "admin.localhost" ||
    h.startsWith("admin.")
  ) {
    return "admin";
  }
  if (
    h === hosts.plataforma ||
    h === "plataforma.localhost" ||
    h.startsWith("plataforma.")
  ) {
    return "plataforma";
  }
  if (h === hosts.apex || h === "localhost" || h.endsWith(".localhost")) {
    return "marketing";
  }
  return "marketing";
}
