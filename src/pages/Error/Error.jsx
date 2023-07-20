import React from "react";

function Error({ error, handleSearchUser }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center pr-40 pl-40 pt-10 pb-10">
      <div className="w-full inline-block items-center justify-center">
        <p className="mb-5 text-xl">{error.message}</p>
        <input
          onChange={handleSearchUser}
          placeholder="Search User"
          className="col-span-12 w-full h-[80px] rounded-3xl pl-10 text-2xl transition-all duration-300 outline-none border-[3px] border-gray-200 focus:border-[#e7acd9] "
        />
      </div>
    </div>
  );
}

export default Error;
