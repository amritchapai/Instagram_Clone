import { createSlice } from "@reduxjs/toolkit";

const postSlice= createSlice({
    name: 'post',
    initialState:{
        posts: []
    },
    reducers:{
        addPost: (state, action)=>{
            state.posts.push(action.payload)
        },
        deletePost: (state, action)=>{
            state.posts = state.post.filter((item, index)=>{
                return (item !== action.payload)
            });
        },
        clearPost: (state, action)=>{
            state.posts= []
        }
    }
})

export const {addPost, deletePost, clearPost} = postSlice.actions;
export default postSlice.reducer