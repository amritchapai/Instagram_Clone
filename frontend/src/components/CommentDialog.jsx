import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

const CommentDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-sm text-gray-400">View all 10 comments</span>
      </DialogTrigger>
      <DialogContent className="w-[90%] h-[50%]">
        <img src="https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" />
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
