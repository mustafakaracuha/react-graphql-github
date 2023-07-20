import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDebounce } from "use-debounce";
import { useLazyQuery } from "@apollo/client";

import moment from "moment";

import { LiaStarSolid } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { RiGitRepositoryFill } from "react-icons/ri";

import GET_USER_REPOSITORIES from "../../apollo/apolloQuery";
import Loading from "../../pages/Loading/Loading";
import Error from "../../pages/Error/Error";

const RepositoryList = () => {
  const [username, setUserName] = useState(
    localStorage.getItem("user")
      ? localStorage.getItem("user")
      : "mustafakaracuha"
  );
  const [debouncedUsername] = useDebounce(username, 1000);

  const [getUserData, { loading, error, data }] = useLazyQuery(
    GET_USER_REPOSITORIES,
    { variables: { username: debouncedUsername } }
  );

  useEffect(() => {
    if (debouncedUsername.trim() !== "") {
      getUserData();
    }
  }, [debouncedUsername, getUserData]);

  const handleSearchUser = (event) => {
    localStorage.setItem("user", event.target.value);
    setUserName(event.target.value);
  };

  const user = data?.user;
  const repositories = user?.repositories?.nodes;
  const avatarUrl = user?.avatarUrl;

  if (loading) return <Loading />;
  if (error) return <Error error={error} handleSearchUser={handleSearchUser} />;

  return (
    <div className="w-full min-h-screen bg-gray-100 pr-44 pl-44 pt-10 pb-10">
      <div className="w-full h-[80px] flex items-center justify-center col-span-12 bg-transparent mb-5 rounded-3xl">
        <input
          onChange={handleSearchUser}
          placeholder="Search User"
          className="w-full h-[80px] bg-white rounded-3xl pl-10 text-2xl transition-all duration-400 outline-none border-[3px] border-transparent focus:border-[#e7acd9]"
        />
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
              Repositorys ({user?.repositories.totalCount})
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
          <p className="w-full col-span-12 mb-5 ml-5 text-[40px]">
            Your Repositorys
          </p>
          <p className="text-[30px]">{user?.repositories.totalCount}</p>
        </div>
        {repositories?.map((repo) => (
          <div
            onClick={() => window.open(repo.url, "_blank")}
            className="w-full h-[200px] flex items-center justify-center overflow-hidden col-span-12 bg-white rounded-2xl text-center p-5 cursor-pointer transition-all duration-300 hover:ring-4 hover:ring-violet-400 group/item"
            key={repo.name}
          >
            <div className="w-full h-full flex items-center justify-around">
              <div className="flex items-center text-left">
                <div className="w-[85px] h-[85px] rounded-full bg-gray-200 group-hover/item:bg-violet-400 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                  <RiGitRepositoryFill
                    size={26}
                    className="text-gray-500 transition-all duration-300 group-hover/item:text-white"
                  />
                </div>
                <p className=" w-32 overflow-hidden text-ellipsis whitespace-nowrap text-gray-600 text-md transition-all duration-300 group-hover/item:font-black ml-8">
                  {repo.name}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <LiaStarSolid size={22} className="text-amber-400" />
                <p className="text-gray-600 text-md ml-2">
                  {repo.stargazerCount}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <FaEye size={22} className="text-sky-500" />
                <p className="text-gray-600 text-md ml-2">
                  {repo.watchers.totalCount}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <FaCodeFork size={20} className="text-orange-500" />
                <p className="text-gray-600 text-md ml-2">
                  {repo.forks.totalCount}
                </p>
              </div>
              {moment(repo.createdAt).format("L")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
