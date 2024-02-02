import React from "react";
import Spinner from "./Spinner";

export default function Button({ loading, text }) {
  return (
    <button
      className="bg-indigo-600 flex justify-center items-center text-white font-semibold rounded shadow-[0_0_15px_2px] hover:shadow-indigo-300 hover:bg-indigo-700 transition-all ease-out duration-300 h-11"
      disabled={loading}
      type="submit"
    >
      {loading ? <Spinner width="30px" /> : text}
    </button>
  );
}
