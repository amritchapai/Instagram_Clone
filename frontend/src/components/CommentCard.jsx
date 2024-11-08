import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart } from "lucide-react";

const CommentCard = () => {
  return (
    <div className="flex items-center gap-3 mb-7">
      <div className="self-start">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p>
              <span className="mr-2 font-semibold">Username</span>Lorem ipsum
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              quia sunt commodi adipisci nemo, magnam obcaecati dolore sapiente
              sed mollitia reprehenderit suscipit aperiam nesciunt pariatur,
              saepe labore distinctio maxime hic quae explicabo voluptate quasi.
              Sunt. dolor sit and also how are you.
            </p>
          </div>
          <div>
            <Heart className="m-2" />
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-sm font-light text-gray-500 cursor-pointer">
            5h
          </span>
          <span className="text-sm font-light text-gray-500 cursor-pointer">
            3,207 likes
          </span>
          <span className="text-sm font-light text-gray-500 cursor-pointer">
            Reply
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
