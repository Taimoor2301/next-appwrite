import { NextResponse } from "next/server";

export async function middleware(req) {
	const requestedUrl = req.nextUrl.pathname;

	const authRoutes = [ "/Auth/login", "/Auth/register" , "/Auth/verifyemail", "/Auth/forgotpassword"]

	const authPath = authRoutes.includes(requestedUrl);

	const token = req.cookies.get("accessToken")?.value || "";

	if (authPath && token){

		return NextResponse.redirect(new URL("/", req.nextUrl));}

	if (!authPath && !token) {

		return NextResponse.redirect(new URL("/Auth/login", req.nextUrl));}
}

export const config = {
	matcher: ["/", "/Auth/login", "/Auth/register" , "/Auth/verifyemail", "/Auth/forgotpassword"],
};
