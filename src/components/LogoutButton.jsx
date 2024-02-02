"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { baseURL } from "src/lib/baseURL";
import Spinner from "./Spinner";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(baseURL + "/logout");
      toast.success(res.data.msg);
      router.push("/Auth/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={logout}
      className="w-full max-w-md h-10 flex justify-center items-center rounded-md bg-neutral-800 text-white font-semibold disabled:opacity-80 disabled:cursor-not-allowed"
    >
      {loading ? <Spinner color="white" width="30px" /> : "Logout"}
    </button>
  );
}
