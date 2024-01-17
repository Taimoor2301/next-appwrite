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
	const [user, setUser] = useState({ email: "", password: "" });

	// useEffect(() => {}, []);

	async function login(e) {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(baseURL + "/login", user);
			toast.success(res.data.msg);
			router.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.msg || error.data?.msg || "something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='min-h-[80vh] bg-gray-100 rounded-md max-w-lg mx-auto flex flex-col py-10 px-5'>
			<span className='text-2xl font-bold text-gray-700 mb-10 w-full text-center'>Login</span>

			<form
				onSubmit={login}
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
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						placeholder='Jhondoe@email.com'
						className='p-2 rounded-md shadow-sm'
					/>
				</label>
				<label
					htmlFor='password'
					className='flex flex-col gap-1'>
					Password
					<input
						type='password'
						name='password'
						id='password'
						required
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						placeholder='password'
						className='p-2 rounded-md shadow-sm'
					/>
				</label>
				<Link
					href={"/forgotpassword"}
					className='text-gray-600 hover:underline'>
					Forgot Password ?
				</Link>
				<button
					className='font-semibold text-white bg-gray-800 px-5 py-2 rounded-md disabled:opacity-80 disabled:cursor-not-allowed mt-6'
					disabled={loading}
					type='submit'>
					{loading ? "Loading..." : "login"}
				</button>
			</form>
		</div>
	);
}
