import { getAllUser } from '@/redux/userSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useGetSuggestedUser = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
        const getSuggestedUser = async()=>{
           try {
             const res = await axios.get(
               "http://localhost:8000/suggestedUsers",
               {
                 withCredentials: true,
               }
             );
             if (res.data.success) {
            //    console.log(res.data.users);
               dispatch(getAllUser(res.data.users));
             }
           } catch (error) {
            console.log(error);
            toast.error(error.respone?.data?.message)
           }
        }
        getSuggestedUser();
  }, [])
}

export default useGetSuggestedUser