import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const CreatePost = ({open, setOpen}) => {
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
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam sequi voluptatum veritatis doloremque unde deserunt iure magnam placeat ab laudantium, commodi at nihil quos beatae temporibus repudiandae ducimus voluptatibus reiciendis fugiat officia ratione maxime, eaque recusandae! Omnis necessitatibus perspiciatis earum illo quibusdam quas molestiae ducimus hic assumenda numquam fuga consectetur, libero, consequatur reiciendis? Quis in, sapiente nobis cum tempore consectetur.
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreatePost