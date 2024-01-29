import jwt from "jsonwebtoken";

export async function DecodeJWT(req) {
	const token = req.cookies.get("accessToken")?.value || "";
	if (!token) return null;
	const payload = await jwt.verify(token, process.env.JWT_SECRET);
	return payload;
}
