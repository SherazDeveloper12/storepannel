'use client'
import { useRouter } from 'next/dist/client/components/navigation';

import React, { ReactNode, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar';
import { fetchDataLocally, getme } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsLocally } from '../store/slices/productsSlice';
import { fetchCategories, fetchCategoriesLocally } from '../store/slices/categorySlice';
import { fetchBrands, fetchBrandsLocally } from '../store/slices/brandSlice';
import { FetchAllOrders } from '../store/slices/orderSlice';
export default function layout({children}: {children: ReactNode}) {
  const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(fetchDataLocally())
    dispatch(fetchProductsLocally())
    dispatch(fetchCategoriesLocally())
    dispatch(fetchBrandsLocally())
    dispatch(getme())
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchBrands())
    dispatch(FetchAllOrders())
  }, [])
  const router = useRouter();
 const user = useSelector((state: any) => state.auth.user);
 

  return (
    <div className='flex flex-col w-full min-h-screen h-full bg-neutral-900 text-white relative'>
      <div className='sticky top-0 p-4 overflow-hidden z-10 text-2xl font-bold text-white bg-neutral-800 border-b border-neutral-700 flex justify-start items-center gap-2'>
        <div
            onClick={() => router.push('/')}>
            <h1 className="text-md lg:text-2xl font-bold flex justify-start items-baseline gap-1 lg:gap-2 cursor-pointer">
                <p className='text-white font-extralight  dark:text-gray-300 font-serif'>{`Welcome ${user?.userName}, to`} </p>
                <p className=" text-red-500 font-serif">Store Pannel</p>
                <p>{` of ${user?.storeName}`}</p>
            </h1>
        </div>
       </div>
      <div className='flex-1 flex flex-row w-full h-full relative '>
        <div className=' h-full ' ><SideBar /></div>
        <div className=' w-full p-4 flex'>
          <div className='w-64'></div>
          <div className="flex-1 bg-neutral-900">
        {children}
        </div>
        </div>
      </div>
    </div>
  )
}
