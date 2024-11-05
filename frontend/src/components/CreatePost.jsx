import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
import { Button } from "./ui/button";
import { DataURL } from "@/lib/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreatePost = ({ open, setOpen }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const dataURL = await DataURL(file);
      setPreview(dataURL);
    }
  };

  const captionChangeHandler = (e) => {
    setCaption(e.target.value);
  };

  const crossClickHandler = () => {
    setPreview("");
    setImage("");
  };

  const createPostHandler = async (e) => {
    setLoading(true);
    if (!image) {
      toast.error("Image is required.");
      return;
    }
    const formData = new FormData();
    if (preview) formData.append("image", image);
    formData.append("caption", caption);
    try {
      const res = await axios.post(
        "http://localhost:8000/addPost",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => {
          setOpen(false);
        }}
        className="max-w-4xl overflow-y-auto"
      >
        <DialogTitle>Create Post</DialogTitle>
        <hr className="bg-red-500" />
        <div className="flex gap-2 padding-2 items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">Username</span>
        </div>
        <hr className="bg-red-600" />
        <Textarea
          className="outline-none border-none focus-visible:ring-0"
          placeholder="Add a caption..."
          name="caption"
          value={caption}
          onChange={captionChangeHandler}
        />
        {preview && (
          <div className="relative w-full h-64 flex items-center justify-center">
            <img
              src={preview}
              alt="uploaded image"
              className="h-full w-full object-cover"
            />
            <CrossCircledIcon
              onClick={crossClickHandler}
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
            />
          </div>
        )}
        <input ref={imageRef} type="file" hidden onChange={fileChangeHandler} />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto"
        >
          Add from this device
        </Button>
        {preview &&
          (loading ? (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-black text-red-600 w-fit mx-auto font-bold text-lg "
              onClick={createPostHandler}
            >
              <Loader2 />
              Please wait
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-black text-red-600 w-fit mx-auto font-bold text-lg "
              onClick={createPostHandler}
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
