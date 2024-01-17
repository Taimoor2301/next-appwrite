"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const logout = async () => {
		try {
			setLoading(true);
			const res = await axios.get(baseURL + "/logout");
			toast.success(res.data.msg);
			router.push("/login");
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.msg || "something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return (
		<button
			disabled={loading}
			onClick={logout}
			className='p-2 rounded-md bg-gray-800 text-white font-semibold disabled:opacity-80 disabled:cursor-not-allowed'>
			Logout
		</button>
	);
}
