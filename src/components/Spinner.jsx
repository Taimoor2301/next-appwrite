import React from "react";

export default function Spinner({ color = "white", width = `8px` }) {
  return (
    <>
      <div className="flex flex-row gap-2 w-full justify-center">
        <div
          style={{ backgroundColor: color, width: width }}
          className="w-2 aspect-square rounded-full bg-white animate-pulse [animation-delay:.7s]"
        ></div>
        <div
          style={{ backgroundColor: color, width: width }}
          className="w-2 aspect-square rounded-full bg-white animate-pulse [animation-delay:.3s]"
        ></div>
        <div
          style={{ backgroundColor: color, width: width }}
          className="w-2 aspect-square rounded-full bg-white animate-pulse [animation-delay:.7s]"
        ></div>
      </div>
    </>
  );
}
