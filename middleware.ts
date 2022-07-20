import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === "/play") {
		return NextResponse.redirect(new URL("/api/random", request.url));
	} else if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/play/1", request.url));
	}
}
