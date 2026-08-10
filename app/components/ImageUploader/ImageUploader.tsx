"use client"
import { ImagePlusIcon } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { data } from 'react-router';




export default function ImageUploader({value, setValue}) {
        
        const [imgboxhovered, setimgboxhovered] = useState(false);
       
    const [ImgUrl, setImgUrl] = useState(value);
    useEffect(() => {
        setImgUrl(value);
    }, [value]);
    const handlechange = async (e) => {
        try {
            const data = new FormData();
            data.append("file", e.target.files[0]);
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
        catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div>

            <label htmlFor="imageuploader"
            onMouseEnter={() => setimgboxhovered(true)}
            onMouseLeave={() => setimgboxhovered(false)}
                className={`relative text-gray-400 flex flex-col  border-dashed border-2 border-gray-300 rounded cursor-pointer bg-neutral-900 hover:border-black hover:text-black transition-all duration-300 size-66 md:size-100  overflow-hidden ${ImgUrl ? 'p-0' : 'justify-center items-center'}`}>
                {ImgUrl ? (<div className='relative w-full h-full'>
                    <img src={value} alt="Uploaded" className="size-50  md:size-100  object-cover rounded  opacity-60" />
                    <div className='absolute inset-0 flex flex-col justify-center items-center text-gray-700  hover:text-white transition-all duration-300'>
                        <ImagePlusIcon color="white" className='size-24' />
                        <p className='text-xl font-bold'>Click here to change image</p>
                    </div>
                </div>) : <>
                    <ImagePlusIcon color="white" className='size-12 md:size-24' />
                    <p className={imgboxhovered ? 'text-white' : 'text-gray-400'}>Upload Image here</p>
                </>
                }
            </label>
            <input type="file" accept="image/*" name='imageuploader' id="imageuploader" className='hidden bg-red-600' onChange={(e) => handlechange(e)} />
        </div>
    )
}
