"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "src/components/Button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [typePass, setTypePass] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });

  async function register(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(baseURL + "/register", user);
      router.push(`/Auth/emailsent?mail=${user.email}`);
      setUser({ email: "", password: "", username: "" });
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
          onSubmit={register}
          className="flex flex-col gap-8 xl:px-10 p-5 justify-center max-w-md mx-auto"
        >
          <div className="flex flex-col items-center text-center sm:py-10">
            <h1 className="font-bold antialiased text-3xl md:text-4xl ">
              Welcome
            </h1>
            <p className="text-gray-800 font-medium pt-3 text-sm">
              Please enter your details
            </p>
          </div>
          <label htmlFor="username" className="flex flex-col gap-1">
            <motion.span
              className="pointer-events-none"
              animate={{
                y: user.username.length > 0 || isUsernameFocus ? 0 : 35,
              }}
            >
              Username
            </motion.span>
            <input
              type="text"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              onFocus={() => setIsUsernameFocus(true)}
              onBlur={() => setIsUsernameFocus(false)}
              className="py-2 border-b-2 border-neutral-800 focus:outline-none bg-transparent"
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-1">
            <motion.span
              className="pointer-events-none"
              animate={{ y: user.email.length > 0 || isEmailFocus ? 0 : 35 }}
            >
              Email
            </motion.span>
            <input
              type="text"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              className="py-2 border-b-2 border-neutral-800 focus:outline-none bg-transparent"
            />
          </label>

          <label htmlFor="password" className="flex flex-col gap-1">
            <motion.span
              animate={{
                y: user.password.length > 0 || isPasswordFocus ? 0 : 35,
              }}
              className="pointer-events-none"
            >
              Password
            </motion.span>
            <div className="w-full border-b-2 border-neutral-800 flex justify-between">
              <input
                type={typePass ? "password" : "text"}
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                className="py-2  focus:outline-none bg-transparent"
              />
              {user.password.length > 0 && (
                <span
                  className="flex items-center text-xs"
                  onClick={() => setTypePass((prev) => !prev)}
                >
                  {typePass ? "Show" : "Hide"}
                </span>
              )}
            </div>
          </label>

          <Button text="Sign up" loading={loading} />

          <div className="flex flex-col gap-2.5 py-3 text-center">
            <span>Already have an account?</span>
            <Link
              href="/Auth/login"
              className="border-2 py-2 rounded border-zinc-700 font-medium hover:text-white hover:border-zinc-800 hover:bg-zinc-800 transition-all duration-300 ease-out"
            >
              Log in
            </Link>
          </div>
        </motion.form>
      </section>
    </>
  );
}
