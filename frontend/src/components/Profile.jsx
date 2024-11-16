import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  console.log(user);
  return (
    <div className="absolute left-[33%] bg-yellow-300 mt-16">
      <Avatar className=" sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-39 lg:w-39">
        <AvatarImage src="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Profile;
