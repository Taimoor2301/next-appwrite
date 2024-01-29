import { NextResponse } from "next/server";
import User from "src/models/user.modal";
import bcryptjs from "bcryptjs";

export async function POST(req) {
	try {
		const body = await req.json();
		const { password, token } = body;

		const user = await User.findOne({ resetToken: token, resetTokenExpirey: { $gt: Date.now() } });

		if (!user?._id) return NextResponse.json({ msg: "Token Not Valid" }, { status: 400 });

		const salt = await bcryptjs.genSalt(10);
		const hashedPass = await bcryptjs.hash(password, salt);

		user.password = hashedPass;
		user.resetToken = null;
		user.resetTokenExpirey = null;
		await user.save();

		return NextResponse.json({ msg: "password updated successfully" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "something went wrong", error: error.message }, { status: 500 });
	}
}
