import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FollowCard from "./FollowCard";
import { Copyright } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightSideBar = () => {
  const { users } = useSelector((store) => store.allUser);
  const navigate = useNavigate();

  const seeAllHandler = () =>{
    navigate("/suggested", {
      state:{
      users: users
      }
    });
  }

  return (
    <div className="fixed right-0 w-[25%] mt-[5.5%] hidden md:flex md:flex-col pr-[7%] gap-3">
      <div className="flex flex-row w-full justify-between">
        <div className="flex gap-2 items-center">
          <Avatar className="cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold cursor-pointer">Username</span>
        </div>
        <div className="flex items-center">
          <span className="cursor-pointer">Switch</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <span className="text-gray-500">Suggested </span>
        <span className="cursor-pointer" onClick={seeAllHandler}>See All</span>
      </div>
      {users.slice(0, 5).map((user) => (
        <FollowCard key={user._id} user={user}/>
      ))}
      <div className="flex mt-6 gap-1 text-xs text-gray-400 flex-wrap">
        <span className="cursor-pointer hover:underline">About </span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Help</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Press</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">API</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Jobs</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Privacy</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Terms</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Locations</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Language</span>
        <span>·</span>
        <span className="cursor-pointer hover:underline">Meta Verified</span>
        <span>·</span>
      </div>
      <div className="flex items-center text-gray-400 mt-4 gap-1">
        <Copyright size={12} />
        <p className=" text-xs">2024 Instagram from Meta</p>
      </div>
    </div>
  );
};

export default RightSideBar;
