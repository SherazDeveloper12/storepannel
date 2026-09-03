'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function PageStarter() {
    const pathname = usePathname();
    const data = [
        { path: '/dashboard', Title: 'Dashboard', Description: 'Welcome back,  Here\'s what\'s happening with your business today.' },
        { path: '/notifications', Title: 'Notifications', Description: 'Stay updated with the latest news and updates.' },
        { path: '/products', Title: 'Products', Description: 'Browse and manage your product catalog.' },
        { path: '/orders', Title: 'Orders', Description: 'Manage and track all customer orders.' },
        { path: '/send-emails', Title: 'Send Emails', Description: 'Promote your products and services through sending email to customers.' },
        { path: '/sales', Title: 'Sales', Description: 'Manage and view your sales data.' },
        { path: '/coupons', Title: 'Coupons', Description: 'Create and manage your coupons.' },
        { path: '/reviews', Title: 'Reviews', Description: 'See what customers are saying about your products.' },
        { path: '/customers', Title: 'Customers', Description: 'View and manage your customer base.' },
        { path: '/settings', Title: 'Settings', Description: 'Manage your account settings and preferences.' }
        
    ]
    const datatoRender = data.filter((item) => item.path === pathname);
  return (
    <div>
       
            <div className='flex flex-col gap-2 items-start justify-start' key={datatoRender[0].path}>
                <p className='text-2xl font-bold'>{datatoRender[0].Title}</p>
                <p className='text-sm text-neutral-400'>{datatoRender[0].Description}</p>
            </div>
      
    </div>
  )
}
