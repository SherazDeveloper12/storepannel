'use client'
import { useRouter } from 'next/dist/client/components/navigation';

import React, { ReactNode } from 'react'
import SideBar from '../components/SideBar/SideBar';


export default function layout({children}: {children: ReactNode}) {
  const router = useRouter();
  return (
    <div className='flex flex-col w-full min-h-screen h-full bg-neutral-900 text-white '>
      <div className='p-4 text-2xl font-bold text-white bg-neutral-800 border-b border-neutral-700 flex justify-start items-center gap-2'>
        <div
            onClick={() => router.push('/')}>
            <h1 className="text-md lg:text-2xl font-bold flex justify-start items-baseline gap-1 lg:gap-2 cursor-pointer">
                <p className='text-white font-extralight  dark:text-gray-300 font-serif'>Welcome to </p>
                <p className=" text-red-500 font-serif">Store Pannel</p>
                
            </h1>
        </div>
       </div>
      <div className='flex-1 flex flex-row w-full h-full '>
        <div ><SideBar /></div>
        {children}
      </div>
    </div>
  )
}
