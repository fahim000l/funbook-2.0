import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request?.cookies?.get("fun_book_token")?.value;
  const publicPath = path === "/signin" || path === "/signup";
  const privatePath =
    path === "/" ||
    path === "/people" ||
    path === "/friends" ||
    path === "/friend-requests";

  if (token && publicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && privatePath) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/",
    "/people",
    "/friends",
    "/friend-requests",
  ],
};
