"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function EmailSent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("mail");
  return (
    <>
      <section className="flex-1 w-full h-full flex flex-col m-auto  text-center justify-center items-center gap-5">
        <h1 className="text-4xl font-bold text-neutral-800">Thank you!</h1>
        <p className="font-medium text-neutral-600">
          A verification email has bee sent to
          <br />
          {email} <br />
          Please check your inbox for verification link!
        </p>
      </section>
    </>
  );
}
