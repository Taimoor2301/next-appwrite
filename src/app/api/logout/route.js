import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = NextResponse.json({ msg: "logout success" }, { status: 200 });
		response.cookies.set("accessToken", "", { httpOnly: true, expires: new Date(0) });
		return response;
	} catch (error) {
		return NextResponse.json({ msg: "error logging out", error }, { status: 500 });
	}
}
