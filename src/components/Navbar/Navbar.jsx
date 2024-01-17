import Link from "next/link";
import React from "react";
import LogoutButton from "../LogoutButton";
import styles from "./navbar.module.css";

export default function Navbar() {
	return (
		<nav className={`max-w-7xl rounded-md shadow-sm bg-gray-100 border px-5 py-2.5 flex items-center justify-between mx-auto my-2 ${styles.nav}`}>
			<Link
				href={"/"}
				className='font-bold text-gray-800 text-xl'>
				NEXT | APP
			</Link>

			<div className='flex items-center gap-4 text-sm font-semibold'>
				<Link href={"/login"}>Login</Link>
				<Link href={"/register"}>Register</Link>
				<LogoutButton />
			</div>
		</nav>
	);
}
