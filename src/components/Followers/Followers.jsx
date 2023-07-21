import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";

import { GET_USER_REPOSITORIES } from "../../GraphQL/Subscription";
import Loading from "../../pages/Loading/Loading";
import Error from "../../pages/Error/Error";

const Followers = () => {
  const [username, setUserName] = useState(
    localStorage.getItem("user")
      ? localStorage.getItem("user")
      : "mustafakaracuha"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState('DESC')
  const [getUserData, { loading, error, data }] = useLazyQuery(
    GET_USER_REPOSITORIES,
    { variables: { username: username,orderBy: orderBy } }
  );

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUsernameSearch = () => {
    if (searchQuery.trim() !== "") {
      localStorage.setItem("user", searchQuery);
      setUserName(searchQuery);
      setSearchQuery("");
    }
  };

  const user = data?.user;
  const followersUser = user?.following?.nodes;
  const avatarUrl = user?.avatarUrl;

  if (loading) return <Loading />;
  if (error)
    return (
      <Error
        error={error}
        searchQuery={searchQuery}
        handleChange={handleChange}
        handleUsernameSearch={handleUsernameSearch}
      />
    );

  return (
    <div className="w-full min-h-screen bg-gray-100 pr-44 pl-44 pt-10 pb-10">
      <div className="w-full h-[80px] flex items-center justify-center col-span-12 bg-transparent mb-5 rounded-3xl">
        <input
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search User"
          className="w-full h-[80px] bg-white rounded-3xl pl-10 text-2xl transition-all duration-400 outline-none border-[3px] border-transparent focus:border-[#e7acd9]"
        />
        <button
          onClick={handleUsernameSearch}
          className="w-[100px] h-20 bg-white rounded-3xl ml-3 flex items-center justify-center transition-all duration-300 active:scale-110 border-[3px] border-transparent active:border-[#e7acd9]"
        >
          <FaSearch size={25} />
        </button>
      </div>
      <div className="w-full h-[460px] bg-white rounded-3xl overflow-hidden">
        <div className="w-full h-[200px] rounded-tl-3xl rounded-tr-3xl  bg-gradient-to-r from-[#7877a6] to-[#e7acd9] col-span-12 flex items-center justify-between relative mb-20">
          <div className="w-full flex items-center">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="rounded-full w-[150px] ml-10 absolute top-[110px] ring-8 ring-white"
            />
          </div>
        </div>
        <div>
          <p className="ml-5 text-[30px] font-semibold">{user?.name}</p>
          <p className="ml-5 text-[20px] text-gray-500 font-light flex items-center">
            {user?.location}
          </p>
          <div className="flex">
            <a
              href={user?.url}
              className="ml-5 mr-2 text-[15px] text-gray-600 font-light mt-2"
            >
              {"@" + username}
            </a>
            <p className="text-[15px] text-black font-normal mt-2">
              • {user?.bio}
            </p>
          </div>
          <div className="text-gray-600 mt-3">
            <NavLink className="ml-5" to="/">
             Repositories ({user?.repositories.totalCount})
            </NavLink>
            <NavLink to="/followers" className="ml-3">
              Followers ({user?.followers.totalCount})
            </NavLink>
            <NavLink to="/following" className="ml-3">
              Following ({user?.following.totalCount})
            </NavLink>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-12 pt-10 gap-5">
        <div className="w-full col-span-12 flex items-center justify-between">
          <p className="w-full col-span-12 mb-5 ml-5 text-[40px]">Followers</p>
          <p className="text-[30px]">{user?.followers.totalCount}</p>
        </div>
        {followersUser?.map((user) => (
          <div
            onClick={() => window.open(user.url, "_blank")}
            className="group/item w-full h-[200px] overflow-hidden flex flex-col items-center justify-center col-span-2 rounded-2xl p-5 cursor-pointer transition-all duration-300"
            key={user.login}
          >
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className=" rounded-full w-[100px] transition-all duration-300 group-hover/item:ring-4 group-hover/item:scale-110 group-hover/item:ring-violet-400"
            />
            <p className="text-gray-600 group-hover/item:text-black group-hover/item:font-bold text-center text-md mt-4">
              {user.login}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
