import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api|handler).*)"],
};

export default function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const rewritePath = "/" + lang;
  const rewriteUrl = new URL(rewritePath, request.nextUrl);
  return NextResponse.rewrite(rewriteUrl);
}
