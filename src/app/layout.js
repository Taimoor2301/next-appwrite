import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./index.css";


const inter = Inter({
	subsets:['latin'], weight:['200', '400', '500', '700']
})


export const metadata = {
	title: "Next JS | Appwrite",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div>
					<Toaster
						position='top-center'
						reverseOrder={false}
						toastOptions={{duration:4000}}
					/>
				</div>

				<div className="lg:h-screen min-h-screen flex justify-center items-center sm:p-6 p-2 bg-neutral-400">
				{children}
				</div>
			</body>
		</html>
	);
}
