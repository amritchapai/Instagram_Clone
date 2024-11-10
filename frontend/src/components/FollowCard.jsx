import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const FollowCard = ({key, user, users}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold cursor-pointer">{user.username}</span>
      </div>
      <span className='cursor-pointer'>Follow</span>
    </div>
  );
}

export default FollowCard