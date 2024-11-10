import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import useGetAllPosts from "../../hooks/useGetAllPosts.js";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser.js";


const Home = () => {
  useGetAllPosts();
  useGetSuggestedUser();
  return (
    <div className="flex">
      <div className=" flex flex-grow">
        <div className="w-[100%]">
          <Feed />
          <Outlet />
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default Home;