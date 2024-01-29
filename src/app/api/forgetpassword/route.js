import { NextResponse } from "next/server";
import User from "src/models/user.modal";
import { sendEmail } from "src/Helper/sendEmail";

export async function POST(req) {
	try {
		const body = await req.json();
		const { email } = body;
		const user = await User.findOne({ email }).select("-password");
		if (!user?._id) return NextResponse.json({ msg: "user not found", user: null }, { status: 404 });
		await sendEmail({ email: user.email, emailType: "reset", userId: user._id });
		return NextResponse.json({ msg: "Please Check Your Email." , email:user.email }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "something went wrong", error: error.message }, { status: 500 });
	}
}
