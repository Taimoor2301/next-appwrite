import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = NextResponse.json({ msg: "logout success" }, { status: 200 });
		response.cookies.delete('accessToken');
		return response;
	} catch (error) {
		return NextResponse.json({ msg: "error logging out", error }, { status: 500 });
	}
}
