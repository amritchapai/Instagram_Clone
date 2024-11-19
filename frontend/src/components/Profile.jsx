import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SettingsIcon } from "lucide-react";
import SquarePosts from "./SquarePosts";
import { useSelector } from "react-redux";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  console.log(user);
  return (
    <div className="absolute left-[25%] mt-16 mr-20 w-[calc(100%-25%-90px)]">
      <div className="flex gap-20 ml-16">
        <Avatar className="sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-45 lg:w-45 cursor-pointer">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 items center">
            <span className="text-lg cursor-pointer">{user.username}</span>
            <div className="flex gap-2">
              <Button className="h-8 cursor-pointer bg-[#8b8989] text-white hover:bg-[#767575]">
                Edit Profile
              </Button>
              <Button className="h-8 cursor-pointer bg-[#8b8989] text-white hover:bg-[#767575]">
                View archive
              </Button>
              <SettingsIcon size={30} />
            </div>
          </div>
          <div className="flex gap-10">
            <span>{user.posts.length} Posts</span>
            <span>345 followers</span>
            <span>489 following</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Name</span>
            <span>bio</span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-center gap-10">
          <Button className="bg-transparent border-t-2 rounded-none hover:bg-transparent text-black border-black">
            POSTS
          </Button>
          <Button className="bg-transparent rounded-none hover:bg-transparent text-black border-black">
            SAVED
          </Button>
          <Button className="bg-transparent  rounded-none hover:bg-transparent text-black border-black">
            TAGGED
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap w-full m-0">
        {
          [1,2,3,4,5].map((item, index) => <SquarePosts key={index}/>)
        }
      </div>
    </div>
  );
};

export default Profile;
