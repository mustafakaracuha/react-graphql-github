import React, { useState,useEffect } from "react";
import {NavLink,useLocation} from "react-router-dom";

import { useDebounce } from 'use-debounce';
import {useLazyQuery } from "@apollo/client";

import { ImSpinner9 } from 'react-icons/im';
import { LiaStarSolid } from 'react-icons/lia';
import { FaEye } from 'react-icons/fa';
import { FaCodeFork } from 'react-icons/fa6';




import GET_USER_REPOSITORIES from "../../apollo/apolloQuery";

const RepositoryList = () => {
  const [username, setUserName] = useState(localStorage.getItem("user")? localStorage.getItem("user") : "mustafakaracuha")
  const [debouncedUsername] = useDebounce(username, 1000); 

  const [getUserData, { loading, error, data }] = useLazyQuery(GET_USER_REPOSITORIES, {variables: { username: debouncedUsername }});
  

  useEffect(() => {
    if (debouncedUsername.trim() !== '') {
      getUserData();
    }
  }, [debouncedUsername, getUserData]);


  const handleSearchUser = (event) => {
    localStorage.setItem("user", event.target.value)
    setUserName(event.target.value);
  };


  const user = data?.user;
  const repositories = user?.repositories?.nodes;
  const avatarUrl = user?.avatarUrl;

  console.log(repositories)

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ImSpinner9 size={40} className=" animate-spin text-indigo-500"/>
      </div>
    );
  if (error)
    return (
      <div className="w-full min-h-screen flex items-center justify-center pr-20 pl-20 pt-10 pb-10">
      <div className="w-full inline-block items-center justify-center">
      <p className="mb-5 text-xl">{error.message}</p>
      <input onChange={handleSearchUser} placeholder="Search User" className="col-span-12 w-full h-[80px] rounded-3xl pl-10 text-2xl transition-all duration-300 outline-none border-[3px] border-gray-200 focus:border-[#e7acd9] " />
      </div>
    </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-100 pr-20 pl-20 pt-10 pb-10">
        <div className="w-full h-[80px] flex items-center justify-center col-span-12 bg-transparent mb-5 rounded-3xl">
        <input onChange={handleSearchUser} placeholder="Search User" className="w-full h-[80px] bg-white rounded-3xl pl-10 text-2xl transition-all duration-400 outline-none border-[3px] border-transparent focus:border-[#e7acd9]" />
        </div>
      <div className="w-full h-[460px] bg-white rounded-3xl">
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
              <NavLink className="ml-5" to="/">Repositorys ({user?.repositories.totalCount})</NavLink>
              <NavLink to="/followers" className="ml-3">Followers ({user?.followers.totalCount})</NavLink>
              <NavLink to="/following" className="ml-3">Following ({user?.following.totalCount})</NavLink>
            </div>
      </div>
    </div>
      
      <div className="w-full grid grid-cols-12 pt-10 gap-5">
        <div className="w-full col-span-12 flex items-center justify-between">
        <p className="w-full col-span-12 mb-5 ml-5 text-[40px]">Your Repositorys</p>
        <p className="text-[30px]">{user?.repositories.totalCount}</p>
        </div>
        {
        repositories?.map((repo) => (
          <div
            onClick={() => window.open(repo.url,"_blank")}
            className="w-full h-[200px] flex items-center justify-center col-span-2 bg-white rounded-2xl text-center p-5 cursor-pointer transition-all duration-300 hover:ring-4 hover:ring-violet-400"
            key={repo.name}
          >
            <div className="w-full h-full flex flex-col items-center justify-evenly">
           <p className="text-gray-600 text-md">{repo.name}</p>
           <div className="flex items-center justify-center mt-2">
           <LiaStarSolid size={20} className="text-amber-400"/>
           <p className="text-gray-600 text-md ml-2">{repo.stargazerCount}</p>
           </div>
           <div className="flex items-center justify-center">
           <FaEye size={20} className="text-sky-500"/>
           <p className="text-gray-600 text-md ml-2">{repo.watchers.totalCount}</p>
           </div>
           <div className="flex items-center justify-center">
           <FaCodeFork size={19} className="text-orange-500"/>
           <p className="text-gray-600 text-md ml-2">{repo.forks.totalCount}</p>
           </div>
           </div>
          </div>
        ))
        }
      </div> 
    </div> 
  );
};

export default RepositoryList;
