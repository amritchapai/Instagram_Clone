import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { useRef } from 'react'
import { Button } from './ui/button'
import { DataURL } from '@/lib/utils'

const CreatePost = ({open, setOpen}) => {
    const [caption, setCaption] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const imageRef = useRef();
    const fileChangeHandler= async(e)=>{
        const file = e.target.files?.[0];
        if(file){
            setImage(file);
            const dataURL = await  DataURL(file);
            setPreview(dataURL);
        }
    }
  return (
    <Dialog open={open}>
        <DialogContent onInteractOutside= {()=>{setOpen(false)}} className="max-w-4xl">
            <DialogTitle>Create Post</DialogTitle>
            <hr className='bg-red-500'/>
            <div className='flex gap-2 padding-2 items-center'>
                    <Avatar>
                        <AvatarImage src=""/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='font-semibold text-sm'>Username</span>
            </div>
            <hr className='bg-red-600'/>
                <Textarea className = "outline-none border-none focus-visible:ring-0" placeholder="Add a caption..."/>
                {
                    preview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                            <img src={preview} alt = "uploaded image" className="h-full w-full object-cover" />
                        </div>
                    )
                }
                <input ref={imageRef} type='file' hidden onChange={fileChangeHandler}/>
                <Button onClick={()=>imageRef.current.click()} className="w-fit mx-auto" >Add from this device</Button>
        </DialogContent>
    </Dialog>
  )
}

export default CreatePost