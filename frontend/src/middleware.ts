import { NextRequest, NextResponse } from "next/server";
// Fast redirect only. Real verification happens in the backend and in the admin layout (/api/auth/me).
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login" || req.cookies.has("zsc_session")) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin/:path*"] };
