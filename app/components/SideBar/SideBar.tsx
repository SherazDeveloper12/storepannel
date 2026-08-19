import { logout } from '@/app/store/slices/authSlice';
import { LayoutDashboard, Package, Settings, ShoppingCart, Store } from 'lucide-react';
import { usePathname, useRouter, } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

export default function SideBar() {
  const items = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    // { label: 'Analytics', path: '/analytics' },
    { label: 'Products', path: '/products', icon: <Package size={20} /> },
    { label: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    // { label: 'Promotions', path: '/promotions' },
    // { label: 'Sales', path: '/sales' },
    // {label: 'Coupons', path: '/coupons'},
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
    <div

      className='fixed left-0 top-0 h-screen w-64    flex flex-col justify-between gap-6 border-r border-neutral-700'>

      <div className='flex justify-start items-center  gap-4 px-6 h-16 border-b border-neutral-700'>
        <div className='flex justify-center items-center gap-2 bg-red-700 size-8 text-black rounded-md'>
          <Store />
        </div>

        <div className=' flex flex-col justify-start items-start '>

          <p className='text-md lg:text-xl  text-white font-extralight  dark:text-gray-300 font-serif'>Store Pannel</p>

          <p className='text-gray-400 text-xs'>Manage your store</p>
        </div>
      </div>

      <ul className='flex-1 flex flex-col gap-2 p-4 ' >
        {items.map((item) => (
          <li
            onClick={() => router.push(item.path)}
            key={item.path}
            className={`px-2 py-2 flex justify-start text-neutral-400 hover:text-white items-center gap-2 rounded font-semibold hover:bg-neutral-800 transition-colors duration-300 cursor-pointer ${pathname === item.path ? 'bg-neutral-900 text-red-500  ' : ''}`}
          >
            <span >{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>

      <div className='p-4 border-t border-neutral-700 w-full'>
        <button className='py-2 hover:bg-red-500 font-semibold cursor-pointer bg-neutral-600 text-white w-full'
          onClick={() => handleLogout()}>
          Logout
        </button>
      </div>

    </div>
  )
}
