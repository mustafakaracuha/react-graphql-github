import React from "react";

import { ImSpinner5 } from "react-icons/im";

function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ImSpinner5 size={45} className=" animate-spin text-violet-500" />
    </div>
  );
}

export default Loading;
