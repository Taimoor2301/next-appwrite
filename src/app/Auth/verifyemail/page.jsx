"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";
import { motion } from "framer-motion";
import Spinner from "src/components/Spinner";

export default function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState(false);

  async function verifyToken() {
    try {
      setPageError(false);
      setLoading(true);
      const res = await axios.post(baseURL + "/verifyemail", { token });
      if (res.data.success) {
        setTimeout(() => {
          router.push("/Auth/login");
        }, 3000);
      }
    } catch (error) {
      setPageError(true);
      console.log(error);
      toast.error(error.data?.msg || "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyToken();
  }, [token]);

  let content;

  if (loading) {
    content = (
      <div>
        <Spinner width="15px" color="black" />
      </div>
    );
  }

  if (pageError) {
    content = (
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-3xl font-bold text-neutral-800">Oops!</h1>{" "}
        <p className="text-sm font-medium text-neutral-600">
          Something went wrong... <br />
          we can't verify your email right now!
        </p>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-3xl font-bold text-neutral-800">Email Verified!</h1>{" "}
        <p className="text-sm font-medium text-neutral-600">
          Your email has been verified successfully
          <br />
          you will be redirected to login page shortly!
        </p>
        <Spinner width="15px" color="black" />
      </div>
    );
  }

  return (
    <>
      <section className="bg-white flex-1 w-full h-full flex justify-center items-center">
        {content}
      </section>
    </>
  );
}
