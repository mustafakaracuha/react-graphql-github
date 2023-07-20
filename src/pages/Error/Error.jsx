import React from "react";
import { FaSearch } from "react-icons/fa";

function Error({ error, searchQuery, handleChange, handleUsernameSearch }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center pr-40 pl-40 pt-10 pb-10">
      <div className="w-full inline-block items-center justify-center">
        <p className="mb-5 text-xl">{error.message}</p>
        <div className="w-full h-[80px] flex items-center justify-between col-span-12 bg-transparent mb-5 rounded-3xl">
          <input
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search User"
            className="col-span-12 w-full h-[80px] rounded-3xl pl-10 text-2xl transition-all duration-300 outline-none border-[3px] border-gray-200 focus:border-[#e7acd9] "
          />
          <button
            onClick={handleUsernameSearch}
            className="w-[100px] h-20 bg-white rounded-3xl ml-3 flex items-center justify-center transition-all duration-300 active:scale-110 border-[3px] border-gray-200 active:border-[#e7acd9]"
          >
            <FaSearch size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
