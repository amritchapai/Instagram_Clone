import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const FollowCard = ({user}) => {
  const [follow, setFollow] =  useState(false)

  const followHandler = ()=>{
    setFollow(prev => !prev);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold cursor-pointer">{user.username}</span>
      </div>
      <span className="cursor-pointer" onClick={followHandler}>
        {follow ? (
          <>Following</>
        ) : (
          <>Follow</>
        )}
      </span>
    </div>
  );
}

export default FollowCard