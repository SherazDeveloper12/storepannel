'use client'
import { useRouter } from 'next/dist/client/components/navigation';

import React, { ReactNode, useEffect } from 'react'
import SideBar from '../components/SideBar/SideBar';
import { fetchDataLocally, getme } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsLocally } from '../store/slices/productsSlice';
import { fetchCategories, fetchCategoriesLocally } from '../store/slices/categorySlice';
import { fetchBrands, fetchBrandsLocally } from '../store/slices/brandSlice';
import { FetchAllOrders, fetchAllOrdersLocally } from '../store/slices/orderSlice';
import { Bell, House, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchNotifications, fetchNotificationsLocally } from '../store/slices/settingSlice';
import { fetchCoupons, fetchCouponsLocally } from '../store/slices/couponSlice';
import { FetchAllcustomers, fetchAllcustomersLocally } from '../store/slices/customerSlice';
import Link from 'next/link';
export default function layout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchDataLocally())
    dispatch(fetchProductsLocally())
    dispatch(fetchCategoriesLocally())
    dispatch(fetchBrandsLocally())
    dispatch(fetchCouponsLocally())
    dispatch(fetchAllOrdersLocally())
    dispatch(FetchAllcustomers())
    dispatch(fetchNotifications())
    dispatch(getme())
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchBrands())
    dispatch(FetchAllOrders())
    dispatch(fetchCoupons())
    dispatch(fetchAllcustomersLocally())
    dispatch(fetchNotificationsLocally())
  }, [])
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const notification = useSelector((state: any) => state.setting.notifications);
  const unreadNotifications = notification.filter((notification: any) => notification.isRead === false);
  const sidebarOpen = useSelector((state: any) => state.setting.sidebarOpen);
  return (
    <div
      className='flex  w-full min-h-screen h-full bg-neutral-950 text-white relative  '>
      <motion.div
        animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
        transition={{ duration: 0.3 }}
        className={`sticky left-0 top-0 h-screen  ${sidebarOpen ? 'w-64' : 'w-20'}  hidden  md:flex flex-col justify-between gap-6 border-r border-neutral-700 `}>
        <SideBar />
      </motion.div>

      <div className='flex-1 flex flex-col w-full h-full relative   '>
        <div className='sticky left-0 top-0 px-4 h-16 overflow-hidden z-10 text-2xl font-bold text-white bg-neutral-950 border-b border-neutral-700 flex justify-start items-center gap-2'>
          <div
            className='flex justify-between items-center gap-2  w-full'
          >
            <h1
              onClick={() => router.push('/')}
              className="ml-3 text-md lg:text-2xl font-bold flex justify-start items-baseline gap-1 lg:gap-2 cursor-pointer">

              <p className="text-md lg:text-2xl font-bold flex justify-start items-baseline gap-1 lg:gap-2 cursor-pointer">
                {`  ${user?.storeName}`}
              </p>
            </h1>
            <div className='flex justify-center items-center gap-3'>

              <div
                onClick={() => router.push(`${user?.storeURL ? user?.storeURL : '/'}`)}

                className='rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <House />
              </div>

              <div className='rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <Sun />
              </div>
              <div
                onClick={() => router.push('/notifications')}
                className='relative rounded-xl text-gray-400  cursor-pointer hover:bg-neutral-800 hover:text-white/80 transition-colors duration-300 size-8 flex justify-center items-center'>
                <Bell />
                {unreadNotifications.length > 0 && <span className='absolute -top-1 right-0 text-xs bg-red-500 text-white px-1  rounded-full'>{unreadNotifications.length}</span>}
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
          className='flex-1 w-full h-full p-8 pb-16 '>
          {children}
        </motion.div>
      </div>

    </div>
  )
}
