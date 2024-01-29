import User from "src/models/user.modal";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
	try {
		const hashedId = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "verify") {
			await User.findOneAndUpdate(userId, { verifyToken: hashedId, verifyTokenExpirey: Date.now() + 3600000 });
		} else if (emailType === "reset") {
			await User.findOneAndUpdate(userId, { resetToken: hashedId, resetTokenExpirey: Date.now() + 3600000 });
		}

		// xyxl arbw xqpu rbkz

		const mailOptions = {
			from: "taimoor ali",
			to: email,
			subject: emailType === "verify" ? "verify your email" : "reset your password",
			html: `<p>click<a
              href="https://next-auth-by-taimoor.vercel.app/Auth/${emailType === 'verify'?"verifyemail" : "resetpassword"}?token=${hashedId}&linkType=${emailType}">
              here
              </a> to
            ${emailType === "verify" ? "verify your email" : "reset your password"} </p>`,
		};

		const transport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			auth: {
				user: process.env.email_user,
				pass: process.env.email_pass,
			},
		});

		const emailResponse = await transport.sendMail(mailOptions);

		return emailResponse;
	} catch (error) {
		throw new Error(error.message);
	}
};
