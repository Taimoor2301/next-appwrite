"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { baseURL } from "src/lib/baseURL";
import Button from "src/components/Button";
import toast from "react-hot-toast";

export default function page() {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [isPassword1Focus, setIsPassword1Focus] = useState(false);
  const [isPassword2Focus, setIsPassword2Focus] = useState(false);

  const [typePass, setTypePass] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (pass1 !== pass2) return toast.error("passwords are not same");
    setLoading(true);

    try {
      const res = await axios.post(baseURL + "/resetpassword", {
        password: pass1,
        token,
      });
      toast.success(res.data.msg);
      setTimeout(() => {
        router.push("/Auth/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.msg ||
          error.data?.msg ||
          "something went wrong from froentend"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-white flex-1 w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 xl:px-10 p-5 justify-center max-w-md m-auto"
        >
          <div className="flex flex-col items-center text-center py-10 font-[poppins]">
            <h1 className="font-bold antialiased text-3xl md:text-3xl ">
              Reset Your Password
            </h1>
            <p className="text-gray-800 font-medium pt-3 text-sm">
              Please enter your new password{" "}
            </p>
          </div>

          <label htmlFor="password" className="flex flex-col gap-1">
            <motion.span
              animate={{ y: isPassword1Focus || pass1.length > 0 ? 0 : 35 }}
              className="pointer-events-none"
            >
              Password
            </motion.span>
            <div className="w-full border-b-2 border-neutral-800 flex justify-between">
              <input
                type={typePass ? "password" : "text"}
                required
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                onFocus={() => setIsPassword1Focus(true)}
                onBlur={() => setIsPassword1Focus(false)}
                className="py-2  focus:outline-none bg-transparent"
              />
              {pass1.length > 0 && (
                <span
                  className="flex items-center text-xs"
                  onClick={() => setTypePass((prev) => !prev)}
                >
                  {typePass ? "Show" : "Hide"}
                </span>
              )}
            </div>
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            <motion.span
              animate={{ y: isPassword2Focus || pass2.length > 0 ? 0 : 35 }}
              className="pointer-events-none"
            >
              Verify Password
            </motion.span>
            <div className="w-full border-b-2 border-neutral-800 flex justify-between">
              <input
                type={typePass ? "password" : "text"}
                required
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                onFocus={() => setIsPassword2Focus(true)}
                onBlur={() => setIsPassword2Focus(false)}
                className="py-2  focus:outline-none bg-transparent"
              />
              {pass1.length > 0 && (
                <span
                  className="flex items-center text-xs"
                  onClick={() => setTypePass((prev) => !prev)}
                >
                  {typePass ? "Show" : "Hide"}
                </span>
              )}
            </div>
          </label>

          <Button text="Save" loading={loading} />
        </form>
      </section>
    </>
  );
}
