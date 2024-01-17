import { NextResponse } from "next/server";
import { DecodeJWT } from "src/Helper/decodeJWT";
import User from "src/models/user.modal";

export async function GET(req) {
	try {
		const payload = await DecodeJWT(req);
		const email = { payload };
		const user = await User.findOne({ email }).select("-password");

		if (!user?._id) return NextResponse.json({ msg: "user not found", user: null }, { status: 404 });
		return NextResponse.json({ user, msg: "user fetch success" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ user: null, msg: "error fetching user" }, { status: 500 });
	}
}
