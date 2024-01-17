"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [data, setData] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(baseURL + "/forgetpassword", { email });
			toast.success(res.data.msg);
			setData(res.data.user);
			console.log(res);
		} catch (error) {
			console.log(error);
			setData(null);
			toast.error(error.response?.data?.msg || error.data?.msg || "something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='min-h-[80vh] bg-gray-100 rounded-md max-w-lg mx-auto flex flex-col py-10 px-5'>
			<span className='text-2xl font-bold text-gray-700 mb-10 w-full text-center'>Find Your Account</span>

			{data && <div className='text-center'>{data.username}</div>}

			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5'>
				<label
					htmlFor='email'
					className='flex flex-col gap-1'>
					Email
					<input
						type='text'
						name='email'
						id='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Jhondoe@email.com'
						className='p-2 rounded-md shadow-sm'
					/>
				</label>

				<Link
					href={"/login"}
					className='text-gray-600 hover:underline'>
					Login
				</Link>
				<button
					className='font-semibold text-white bg-gray-800 px-5 py-2 rounded-md disabled:opacity-80 disabled:cursor-not-allowed mt-6 w-40 mx-auto'
					disabled={loading}
					type='submit'>
					{loading ? "Loading..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
