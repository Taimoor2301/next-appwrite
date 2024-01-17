import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "please provide an email"],
		unique: true,
	},
	username: {
		type: String,
		required: [true, "please provide username"],
		unique: true,
	},

	password: {
		type: String,
		required: [true, "please provide password"],
	},
	verifyToken: String,
	verifyTokenExpirey: Date,
	resetTokenExpirey: Date,
	resetToken: String,
	isVerified: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
