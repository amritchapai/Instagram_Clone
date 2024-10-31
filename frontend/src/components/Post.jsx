import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Input } from "./ui/input";
import CommentDialog from "./CommentDialog";

const Post = () => {
   const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const changeEventHandler = (e) => {
    const writtenText = e.target.value;
    const withoutSpace = writtenText.trim();
    console.log(writtenText)
    if (withoutSpace) {
      setComment(writtenText);
    } else {
      setComment("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post Image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium ">username</h1>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-sm text-center">
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
              <Button variant="ghost" className="cursor-pointer w-fit">
                Add to favourites
              </Button>
              <Button variant="ghost" className="cursor-pointer w-fit">
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
          <FaRegHeart size={"22px"} className="cursor-pointer" />
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => {
              setOpen(true);
            }}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="text-sm font-bold ">1,243 likes</span>
      <p>
        <span className="font-medium mr-2">Username</span>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
        totam rerum omnis nemo necessitatibus sequi?
      </p>
      <span
        className="text-sm text-gray-400 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        View all 10 comments
      </span>
      <CommentDialog open={open} setOpen= {setOpen} />
      <div className="flex mr-2">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={changeEventHandler}
          placeholder="Add a comment...."
          className=" border-transparent text-sm w-full focus:outline-none focus:border-transparent my-2 pt-1"
        />
        {comment && <span className="text-blue-600">Post</span>}
      </div>
    </div>
  );
};

export default Post;
