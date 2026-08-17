'use client'
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { Clock, DollarSign, Eye, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import React from 'react'

export default function page() {
  return (
    <div className='min-w-full h-screen flex flex-col gap-2 '>
      <PageStarter />
      <DashboardHeader />
      <div></div>
    </div>
  )
}



function DashboardHeader() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const data = [
    {
      title: 'Revenue',
      value: '$10,000',
      icon: <DollarSign color="#000000" size={24} />,
      growth: '5%'
    },
    {
      title: 'Total Orders',
      value: '1,000',
      icon: <ShoppingBag color="#000000" size={24} />,
      growth: '10%'
    },
    {
      title: 'Pending Orders',
      value: '500',
      icon: <Clock color="#000000" size={24} />,
      growth: '2%'
    },
    {
      title: 'Website Visitors',
      value: '3576',
      icon: <Eye color="#000000" />,
      growth: '8%'
    }
  ];
  return (
    <div className='w-full h-1/4 flex flex-row justify-around items-center gap-6   rounded-lg '>
      {data.map((item, index) => (
        <div
          className='flex flex-1  items-center gap-6 bg-neutral-800 border  border-neutral-600 p-4  rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out '
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className=' flex-1 flex flex-col p-4 '>
            <p className={`text-sm text-neutral-400 ${hoveredIndex === index ? 'text-red-500' : ''}`}>{item.title}</p>
            <h3 className='text-4xl font-semibold tracking-tighter'>{item.value}</h3>
            <div className='flex flex-row gap-2 items-center'>
              <p className={`text-sm text-green-400 ${hoveredIndex === index ? 'text-red-500' : ''}`}> {item.growth}</p>
              <TrendingUp color="#05DF72" />
            </div>
          </div>
          <div className={` p-2 ${item.title === 'Revenue' ? 'bg-green-400' : item.title === 'Total Orders' ? 'bg-sky-400' : item.title === 'Pending Orders' ? 'bg-yellow-400' : item.title === 'Website Visitors' ? 'bg-amber-400' : 'bg-gray-400'} rounded-2xl`}>
            {item.icon}
          </div>


        </div>
      ))}
    </div>
  )
}