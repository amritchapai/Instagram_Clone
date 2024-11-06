import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentCard = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Username</span>
            <p>Lorem ipsum dolor sit.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-sm font-light text-gray-500">5h</span>
            <span className="text-sm font-light text-gray-500">
              3,207 likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
