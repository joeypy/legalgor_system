import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { hosts, resolveHostKind } from "@/lib/hosts";

function parseAllowlist(raw: string | undefined) {
  if (!raw?.trim()) return null;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function clientIp(request: NextRequest) {
  return request.headers.get("cf-connecting-ip")?.trim() ?? "";
}

function stripPrefix(pathname: string, prefix: string) {
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length) || "/";
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();
  const kind = resolveHostKind(host);
  const { pathname } = request.nextUrl;

  if (kind === "www") {
    const url = request.nextUrl.clone();
    url.host = hosts.apex;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (kind === "admin") {
    const allowlist = parseAllowlist(process.env.ADMIN_IP_ALLOWLIST);
    const isProd = process.env.NODE_ENV === "production";
    if (isProd && allowlist && allowlist.length > 0) {
      const ip = clientIp(request);
      if (!ip || !allowlist.includes(ip)) {
        return new NextResponse("Forbidden", {
          status: 403,
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      }
    }

    if (pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = stripPrefix(pathname, "/admin");
      return NextResponse.redirect(url, 308);
    }

    if (
      !pathname.startsWith("/admin") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/_next")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (kind === "plataforma") {
    if (pathname.startsWith("/plataforma")) {
      const url = request.nextUrl.clone();
      url.pathname = stripPrefix(pathname, "/plataforma");
      return NextResponse.redirect(url, 308);
    }

    if (
      !pathname.startsWith("/plataforma") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/_next")
    ) {
      const url = request.nextUrl.clone();
      url.pathname =
        pathname === "/" ? "/plataforma" : `/plataforma${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  if (kind === "marketing" && host === hosts.apex) {
    const blocked =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/plataforma") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/chats") ||
      pathname.startsWith("/clientes") ||
      pathname.startsWith("/tramites") ||
      pathname.startsWith("/vencimientos") ||
      pathname.startsWith("/servicios") ||
      pathname.startsWith("/configuracion") ||
      pathname.startsWith("/entrar") ||
      pathname.startsWith("/setup-2fa") ||
      pathname.startsWith("/ajustes");
    if (blocked) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/).*)"],
};
