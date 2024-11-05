import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import CreatePost from "./CreatePost";

const sideBarItems = [
  {
    icon: <Home />,
    text: "Home",
  },
  {
    icon: <Search />,
    text: "Search",
  },
  {
    icon: <TrendingUp />,
    text: "Explore",
  },
  {
    icon: <MessageCircle />,
    text: "Messages",
  },
  {
    icon: <Heart />,
    text: "Notifications",
  },
  {
    icon: <PlusSquare />,
    text: "Create",
  },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  {
    icon: <LogOut />,
    text: "Logout",
  },
];

const LeftSideBar = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leftSideBarHandler = async (text) => {
    if (text === "Logout") {
      try {
        const res = await axios.post("http://localhost:8000/logout", {},{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if(res.data.success){
          toast.success(res.data.message);
          navigate("/login");
          dispatch(setAuthUser(""))
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    }
    else if(text === "Create"){
      setOpen(true);
    }
  };
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[20%] h-screen hidden md:flex">
      <div className="flex flex-col">
        <h1 className="my-8 font-bold pl-3 text-xl">LOGO</h1>
        <div>
          {sideBarItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 m-3"
                onClick={() => leftSideBarHandler(item.text)}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen}/>
    </div>
  );
};

export default LeftSideBar;
