import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import useGetAllPosts from "../../hooks/useGetAllPosts.js";


const Home = () => {
  useGetAllPosts();
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