import { NextResponse } from "next/server";
import { connectToDB } from "src/lib/connectDB";
import User from "src/models/user.modal";
import bcryptjs from "bcryptjs";

connectToDB();

//login

export async function POST(req) {
	const body = await req.json();
	const { username, email, password } = body;

	if (!username || !email || !password) {
		return NextResponse.json({ msg: "something missing" }, { status: 500 });
	}

	const existingUser = await User.findOne({ email });
	if (existingUser?._id) return NextResponse.json({ msg: "user already exist with this email" }, { status: 400 });

	const existingUserId = await User.findOne({ username });
	if (existingUserId?._id) return NextResponse.json({ msg: "username already taken, please try another username" }, { status: 400 });

	try {
		const salt = await bcryptjs.genSalt(10);
		const hash = await bcryptjs.hash(password, salt);

		const user = await User.create({ username, email, password: hash });
		return NextResponse.json({ success: true, msg: "user created successfully", user }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ msg: "something went wrong", error }, { status: 500 });
	}
}
