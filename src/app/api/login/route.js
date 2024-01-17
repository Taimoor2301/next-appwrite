import { NextResponse } from "next/server";
import User from "src/models/user.modal";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
	const body = await req.json();

	const { email, password } = body;

	if (!email || !password) return NextResponse.json({ msg: "invalid cresidentials" }, { status: 400 });

	const user = await User.findOne({ email });

	if (!user?._id) return NextResponse.json({ msg: "no user found with this email" }, { status: 404 });

	const validPass = await bcryptjs.compare(password, user.password);

	if (!validPass) return NextResponse.json({ msg: "incorrect password" }, { status: 401 });

	const token = await jwt.sign({ userId: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

	const response = NextResponse.json(
		{
			msg: "login success",
			username: user.username,
			email: user.email,
		},
		{ status: 200 }
	);

	response.cookies.set("accessToken", token, { httpOnly: true });

	return response;
}
