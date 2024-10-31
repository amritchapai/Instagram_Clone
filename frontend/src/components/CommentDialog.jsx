import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentDialog = ({open, setOpen}) => {
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-[70%] h-[92%] p-0 outline-none border-none "
      >
        <div className="flex flex-2">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 my-2">
              <Avatar className="">
                <AvatarImage src="" alt="image icon" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Username</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
