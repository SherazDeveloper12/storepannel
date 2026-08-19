'use client'
import { logout } from '@/app/store/slices/authSlice';
import { toggleSidebar } from '@/app/store/slices/settingSlice';
import { ArrowLeft, ArrowRight, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Store, TicketPercent } from 'lucide-react';
import { AnimatePresence, motion, } from 'motion/react';
import { usePathname, useRouter, } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
export default function SideBar() {
  const sidebarOpen = useSelector((state: any) => state.setting.sidebarOpen);
  const user = useSelector((state: any) => state.auth.user);
  console.log('user', user)
  const items = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    // { label: 'Analytics', path: '/analytics' },
    { label: 'Products', path: '/products', icon: <Package size={20} /> },
    { label: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    // { label: 'Promotions', path: '/promotions' },
    // { label: 'Sales', path: '/sales' },
    {label: 'Coupons', path: '/coupons', icon: <TicketPercent size={20} />},
    // { label: 'Reviews', path: '/reviews' },
    // { label: 'Inventory', path: '/admin/inventory' },
    // { label: 'Messages', path: '/admin/messages' },
    // { label: 'Customers', path: '/customers' },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  }
  return (
    <motion.div
      animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-screen ${sidebarOpen ? 'w-64' : 'w-20'}    flex flex-col justify-between gap-6 border-r border-neutral-700`}>

      <div className='flex justify-start items-center  gap-4 px-6 h-16 border-b border-neutral-700'>
        <div className='flex justify-center items-center gap-2 bg-red-700 size-8 text-black rounded-md'>
          <Store />
        </div>
        <AnimatePresence>

          {sidebarOpen && <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
            className=' flex flex-col justify-start items-start '>

            <p className='text-md lg:text-xl  text-white font-extralight  dark:text-gray-300 font-serif'>Store Pannel</p>

            <p className='text-gray-400 text-xs'>Manage your store</p>
          </motion.div>}

        </AnimatePresence>
      </div>

      {sidebarOpen ?
        <motion.div
          className={`absolute top-28 ${`left-60`}  flex justify-center items-center gap-2  size-6 rounded-full bg-black border-2 border-neutral-700`}
          layoutId="sidebar-toggle"
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={20} className='cursor-pointer text-gray-400 hover:text-white transition-colors duration-300' onClick={() => dispatch(toggleSidebar())} />
        </motion.div>
        : <motion.div
          className={`absolute top-28 ${'left-16'}  flex justify-center items-center gap-2  size-6 rounded-full bg-black border-2 border-neutral-700`}
          layoutId="sidebar-toggle"
          transition={{ duration: 0.3 }}
        ><ArrowRight size={20} className='cursor-pointer text-gray-400 hover:text-white transition-colors duration-300' onClick={() => dispatch(toggleSidebar())} />
        </motion.div>}

      <ul className='flex-1 flex flex-col gap-2 p-4 ' >
        {items.map((item) => (
          <li
            onClick={() => router.push(item.path)}
            key={item.path}
            className={`px-2 py-2 flex justify-start text-neutral-400 hover:text-white items-center gap-2 rounded font-semibold hover:bg-neutral-800 transition-colors duration-300 cursor-pointer ${pathname === item.path ? 'bg-neutral-900 text-red-500  ' : ''}`}
          >
            <span >{item.icon}</span>
            {sidebarOpen && item.label}
          </li>
        ))}
      </ul>

      <div className={`px-4 h-16 border-t border-neutral-700 w-full flex justify-between   items-center gap-2`}>

        {sidebarOpen &&
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
            className=' flex justify-start items-center gap-4 w-full '>
            <div className='rounded-full   bg-red-950/70 size-8 flex justify-center items-center'>
              <p className='text-red-500 text-sm font-bold'>
                S
              </p>

            </div>
            <motion.div

              className='flex-1 flex flex-col justify-start items-start   w-full'>
              <h2 className='text-sm text-white'>{user?.userName}</h2>
              <p className='text-gray-400 text-xs'>Store Owner</p>
            </motion.div>
          </motion.div>}

        <div className='text-neutral-500 hover:text-white/80 transition-colors duration-300 cursor-pointer' onClick={handleLogout}>
          <LogOut />
        </div>
      </div>

    </motion.div>
  )
}
