import { logout } from '@/app/store/slices/authSlice';
import {  usePathname, useRouter,  } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

export default function SideBar() {
    const items = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Products', path: '/products' },
        { label: 'Orders', path: '/orders' },
        { label: 'Promotions', path: '/promotions' },
        { label: 'Sales', path: '/sales' },
        {label: 'Coupons', path: '/coupons'},
        { label: 'Reviews', path: '/reviews' },
        // { label: 'Inventory', path: '/admin/inventory' },
        // { label: 'Messages', path: '/admin/messages' },
        { label: 'Customers', path: '/customers' },
        { label: 'Settings', path: '/settings' },
    ];
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    }
  return (
    <div className='fixed left-0 top-0 h-full w-64 min-h-screen  bg-neutral-800 p-4 flex flex-col justify-between gap-6  pt-18'>
      
      <ul className='flex flex-col gap-2 ' >
        {items.map((item) => (
          <li
          onClick={() => router.push(item.path)}
            key={item.path}
            className={`px-2 py-2 rounded font-semibold hover:bg-gray-600 cursor-pointer ${pathname === item.path ? 'bg-neutral-900 text-red-500  ' : ''}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button className='py-2 hover:bg-red-500 font-semibold cursor-pointer bg-neutral-600 text-white' 
      onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  )
}
