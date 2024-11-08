import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './LeftSideBar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MainLayout = () => {
  const navigate = useNavigate();
  const {user} = useSelector((store)=>store.auth);

  useEffect(()=>{
    if(!user) {navigate("/login")}
  },[user, navigate])
  
  return (
    <div>
      {user && (
        <div>
          <LeftSideBar />
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout