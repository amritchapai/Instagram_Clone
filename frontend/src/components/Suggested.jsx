import React from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import SuggestedCard from './SuggestedCard';

const Suggested = () => {
    const location = useLocation();
    const users = location.state?.users;
    console.log(users);
  return (
    <div className="absolute left-[38%] w-[38%] mt-20">
      <span className="font-semibold">Suggested</span>
      <div className="flex flex-col mt-4 gap-2">
        {users.map((user) => (
          <SuggestedCard user={user} key={user._id}/>
        ))}
      </div>
    </div>
  );
}

export default Suggested