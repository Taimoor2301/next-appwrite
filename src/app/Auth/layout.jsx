import React from "react";

export default function layout({ children }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row min-h-[90vh]">
      <section className="flex-1  justify-center items-center">
        <div className="h-full">
          <img
            src="/bg.jpg"
            alt=""
            className="object-cover w-full h-full brightness-75"
          />
        </div>
      </section>{" "}
      {children}
    </div>
  );
}
