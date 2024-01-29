"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

export default function page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("mail");
  return (
    <>
      <section className="flex-1 w-full h-full flex flex-col m-auto justify-center items-center gap-5">
        <h1 className="text-4xl font-bold text-neutral-800">
          Thank you for verification!
        </h1>
        <p className="font-medium text-neutral-600 text-center">
          Verification email has bee sent to <br />
          {email} <br />
          Please check your email for verification link!
        </p>
      </section>
    </>
  );
}
