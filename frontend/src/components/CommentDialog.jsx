import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen, caption }) => {
  const[comment, setComment] = useState("");
  const changeEventHandler = (e)=>{
    const obtainedComment = e.target.value;
    const processedComment = obtainedComment.trim();
    if(processedComment){
      setComment(obtainedComment)
    }
    else{
      setComment("")
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col"
      >
        <div className="flex flex-1 gap-3">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-l-lg"
              src="https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-2 items-center">
                <Link to="#">
                  <Avatar className="">
                    <AvatarImage src="" alt="image icon" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Link to="#" className="font-semibold">Username</Link>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-transparent hover:text-red-600"
                    >
                      Unfollow
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent hover:text-gray-600"
                    >
                      Add to favorite
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              Comments here....
            </div>
            <div className=" border-t border-gray-300 p-2 rounded">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={changeEventHandler}
                  placeholder="Add a comment"
                  className="w-full outline-none"
                ></input>
                {comment ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="rounded text-blue-600 hover:text-black border-none outline-none  hover:bg-transparent"
                    >
                      Post
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="ghost"
                      className="rounded border-none outline-none hover:bg-transparent cursor-default"
                    >
                      Post
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
