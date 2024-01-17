import User from "src/models/user.modal";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
	try {
		const hashedId = await bcryptjs.hash(userId.tostring(), 10);

		if (emailType === "verify") {
			await User.findOneAndUpdate(userId, { verifyToken: hashedId, verifyTokenExpirey: Date.now() + 3600000 });
		} else if (emailType === "reset") {
			await User.findOneAndUpdate(userId, { resetToken: hashedId, resetTokenExpirey: Date.now() + 3600000 });
		}

		const mailOptions = {
			from: "taimoor ali",
			to: email,
			subject: emailType === "verify" ? "verify your email" : "reset your password",
			html: `<p>click<a>
              href="http://localhost:3000/verifyemail?token=${hashedId}">
              here
              </a> to 
            ${emailType === "verify" ? "verify your email" : "reset your password"} </p>`,
		};

		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "04f980b7dd0682",
				pass: "626da313c44f28",
			},
		});

		const emailResponse = await transport.sendMail(mailOptions);

		return emailResponse;
	} catch (error) {
		throw new Error(error.message);
	}
};
