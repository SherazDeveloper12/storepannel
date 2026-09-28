"use client"
import { ImagePlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface ImageUploaderProps {
    value?: string;
    setValue: (value: string) => void;
}




export default function ImageUploader({value, setValue}: ImageUploaderProps) {
        
        const [imgboxhovered, setimgboxhovered] = useState(false);
       
    const [ImgUrl, setImgUrl] = useState(value);
    useEffect(() => {
        setImgUrl(value);
    }, [value]);
    const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "image_uploader_preset");
            data.append("cloud_name", "dcli1vwir");

            const response = await fetch("https://api.cloudinary.com/v1_1/dcli1vwir/image/upload", {
                method: "post",
                body: data
            })
            const json = await response.json();
            const url = json.url;
            setImgUrl(url);
            setValue(url);
        }
        catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        }
    }


    return (
        <div className='w-full min-w-0'>

            <label htmlFor="imageuploader"
            onMouseEnter={() => setimgboxhovered(true)}
            onMouseLeave={() => setimgboxhovered(false)}
                className={`relative text-gray-400 flex flex-col  border-dashed border-2 border-gray-300 rounded cursor-pointer bg-neutral-900 hover:border-black hover:text-black transition-all duration-300 w-full max-w-66 md:max-w-100 aspect-square  overflow-hidden ${ImgUrl ? 'p-0' : 'justify-center items-center'}`}>
                {ImgUrl ? (<div className='relative w-full h-full'>
                    <img src={value} alt="Uploaded" className="w-full h-full  object-cover rounded  opacity-60" />
                    <div className='absolute inset-0 flex flex-col justify-center items-center gap-1 text-center p-2 text-gray-700  hover:text-white transition-all duration-300'>
                        <ImagePlusIcon color="white" className='size-10 md:size-24 shrink-0' />
                        <p className='text-sm md:text-xl font-bold'>Click here to change image</p>
                    </div>
                </div>) : <>
                    <ImagePlusIcon color="white" className='size-12 md:size-24 shrink-0' />
                    <p className={`text-sm md:text-base text-center px-2 ${imgboxhovered ? 'text-white' : 'text-gray-400'}`}>Upload Image here</p>
                </>
                }
            </label>
            <input  type="file" accept="image/*" name='imageuploader' id="imageuploader" className='hidden bg-red-600' onChange={(e) => handlechange(e)} />
        </div>
    )
}
