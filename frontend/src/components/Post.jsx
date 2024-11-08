import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = ({post}) => {
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
    <div className="my-8 w-[65%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.owner.profilePicture} alt="post Image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium ">{post.owner.username}</h1>
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
        src={post.photo}
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
        <span className="font-medium mr-2">{post.owner.username}</span>
        {post.caption}
      </p>
      <span
        className="text-sm text-gray-400 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        View all 10 comments
      </span>
      <CommentDialog open={open} setOpen= {setOpen} post={post} />
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