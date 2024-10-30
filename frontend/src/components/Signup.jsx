
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle, LoaderCircleIcon } from 'lucide-react';

const Signup=() => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username:"",
    email:"",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value})
  }

  const signupHandler = async(e) =>{
    e.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/register', input, {headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if(res.data.success){
      toast.success(res.data.message);
      navigate("/login");
      setInput({
        username: "",
        email: "",
        password: "",
      });
    }
    } catch (error) {
      // console.log(error)
      toast.error(error.response?.data?.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
        <div className="my-4">
          <h1 className="text-center font-bold text-xl"> LOGO </h1>
          <p className="text-center text-sm">
            Sign up to see photos and videos from friends
          </p>
        </div>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-1"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-1"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-1"
          />
        </div>
        <Button type="submit">
          {
            loading?(
              <div className='flex items-center gap-2'>
                <LoaderCircleIcon/> Signing Up
              </div>
            ):(
              <div>
                Sign Up
              </div>
            )
          }
        </Button>
        <span className='text-center'>Already have an account?<Link to="/login">Login</Link> </span>
      </form>
    </div>
  );
}

export default Signup