import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Post = () => {
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post IMage" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-sm text-center">
              <Button
                varient="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
              <Button varient="ghost" className="cursor-pointer w-fit">
                Add to favourites
              </Button>
              <Button varient="ghost" className="cursor-pointer w-fit">
                Delete
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image1"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex gap-2 items-center">
          <FaRegHeart size={"22px"} className="cursor-pointer"/>
          <MessageCircle className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600"/>
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600"/>
      </div>
    </div>
  );
};

export default Post;
