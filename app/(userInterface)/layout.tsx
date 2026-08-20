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
import { Bell, House, Sun } from 'lucide-react';
import { motion } from 'motion/react';
export default function layout({ children }: { children: ReactNode }) {
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
  const sidebarOpen = useSelector((state: any) => state.setting.sidebarOpen);
  return (
    <div
      className='flex  w-full min-h-screen h-full bg-neutral-950 text-white relative  '>
        <motion.div
        animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
        transition={{ duration: 0.3 }}
        className={`sticky left-0 top-0 h-screen  ${sidebarOpen ? 'w-64' : 'w-20'}    flex flex-col justify-between gap-6 border-r border-neutral-700 `}>
      <SideBar />
        </motion.div>

      <div className='flex-1 flex flex-col w-full h-full relative   '>
        <div className='sticky left-0 top-0 px-4 h-16 overflow-hidden z-10 text-2xl font-bold text-white bg-neutral-950 border-b border-neutral-700 flex justify-start items-center gap-2'>
          <div
            className='flex justify-between items-center gap-2  w-full'
          >
            <h1
              onClick={() => router.push('/')}
              className="text-md lg:text-2xl font-bold flex justify-start items-baseline gap-1 lg:gap-2 cursor-pointer">

              <p>{`  ${user?.storeName}`}</p>
            </h1>
            <div className='flex justify-center items-center gap-3'>
              <div className='rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <House />
              </div>
              <div className='rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <Sun />
              </div>
              <div className='rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <Bell />
              </div>


              <div className='rounded-full   bg-red-950/70 size-8 flex justify-center items-center'>
                <p className='text-red-500 text-sm font-bold'>
                  S
                </p>

              </div>
            </div>
          </div>
        </div>

        <motion.div
          className='flex-1 w-full h-full p-4 '>
          {children}
        </motion.div>
      </div>

    </div>
  )
}
