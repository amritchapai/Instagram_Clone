import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const SuggestedCard = ({user}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold cursor-pointer">{user.username}</span>
          <span className="text-gray-500 font-light">Name</span>
          <span className="text-gray-500 font-light"> Followed by </span>
        </div>
      </div>
      <Button className="bg-blue-400 rounded-lg w-fit h-fit hover:bg-blue-600">Follow</Button>
    </div>
  );
}

export default SuggestedCard