"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";
import { motion } from "framer-motion";
import Button from "src/components/Button";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(baseURL + "/forgetpassword", { email });
      toast.success(res.data.msg);
      router.push(`/Auth/emailsent?mail=${res.data.email}`);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg || error.data?.msg || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-white flex-1 w-full h-full">
        <motion.form
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              ease: "backOut",
              duration: 1,
              type: "tween",
              delayChildren: 0.5,
              staggerChildren: 0.5,
            },
          }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 xl:px-10 p-5 h-full justify-center max-w-md mx-auto"
        >
          <div className="flex flex-col items-center text-center sm:py-10">
            <h1 className="font-bold antialiased text-3xl md:text-4xl ">
              Find your account!
            </h1>
            <p className="text-gray-800 font-medium pt-3 text-sm">
              Please enter your details
            </p>
          </div>
          <label htmlFor="email" className="flex flex-col gap-1">
            <motion.span
              className="pointer-events-none"
              animate={{ y: email.length > 0 || isEmailFocus ? 0 : 35 }}
            >
              Email
            </motion.span>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              className="py-2 border-b-2 border-neutral-800 focus:outline-none bg-transparent"
            />
          </label>

          <Button text="Verify" loading={loading} />

          <div className="flex flex-col gap-2.5 py-3 text-center">
            <span>Create a new account</span>
            <Link
              href="/Auth/register"
              className="border-2 py-2 rounded border-zinc-700 font-medium hover:text-white hover:border-zinc-800 hover:bg-zinc-800 transition-all duration-300 ease-out"
            >
              Sign Up
            </Link>
          </div>
        </motion.form>
      </section>
    </>
  );
}
