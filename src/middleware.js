import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/carts/:path*", "/member/:path*"],
};
