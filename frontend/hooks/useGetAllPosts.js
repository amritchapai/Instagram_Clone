import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPost } from "@/redux/postSlice"

const useGetAllPosts = () => {
    const dispatch = useDispatch();
     useEffect(()=>{
    const getAllPosts = async ()=>{
        try {
            const res = await axios.get("http://localhost:8000/getAllPost", {
              withCredentials: true,
            });
            if(res.data.success){
                console.log(res.data)
                dispatch(setPost(res.data.posts))
            }
            else{
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    getAllPosts();
  },[])
}

export default useGetAllPosts