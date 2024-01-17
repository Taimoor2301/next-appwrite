import { NextResponse } from "next/server";

export async function middleware(req) {
	const requestedUrl = req.nextUrl.pathname;

	const authPath = requestedUrl === "/login" || requestedUrl === "/register";

	const token = req.cookies.get("accessToken")?.value || "";

	if (authPath && token) return NextResponse.redirect(new URL("/", req.nextUrl));

	if (!authPath && !token) return NextResponse.redirect(new URL("/login", req.nextUrl));
}

export const config = {
	matcher: ["/", "/login", "/register"],
};
