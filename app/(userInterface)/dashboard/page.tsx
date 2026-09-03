'use client'
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { ArrowUpIcon, Clock, DollarSign, Eye, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react'
import { useSelector } from 'react-redux';
import PieChart from '@/app/components/PieChart/PieChart'
import DoughnutChart from '@/app/components/DoughnutChart/DoughnutChart';
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
  const orders = useSelector((state) => state.orders.orders)
  const products = useSelector((state) => state.products.Products)
  const productCount = products ? products.length : 0;
  const reversedOrders = orders.toReversed();
  const recent6Orders = reversedOrders.slice(0, 6);
  const pendingOrders = orders?.filter((order) => order.status === 'Pending');
  console.log(orders, 'orders');
  const pendingOrderCount = pendingOrders ? pendingOrders.length : 0;
  const orderCount = orders ? orders.length : 0;
  const revenue = orders?.reduce((acc, order) => acc + order.payableAmount, 0) || 0;
  const data = [
    {
      title: 'Total Revenue',
      value: revenue.toLocaleString(),
      icon: <DollarSign color="#000000" size={24} />,
      growth: '5%'
    },
    {
      title: 'Total Orders',
      value: `${orderCount}`,
      icon: <ShoppingBag color="#000000" size={24} />,
      growth: '10%'
    },
    {
      title: 'Pending Orders',
      value: `${pendingOrderCount}`,
      icon: <Clock color="#000000" size={24} />,
      growth: '2%'
    },
    {
      title: 'Total Products',
      value: `${productCount}`,
      icon: <Package color="#000000" size={24} />,
      growth: '8%'
    }
  ];
  const bggradientcolors = [
    ' bg-radial from-green-400 from-40% to-blue-700',
    ' bg-radial from-blue-400 from-40% to-purple-700',
    ' bg-radial from-yellow-400 from-40% to-orange-700',
    ' bg-radial from-pink-400 from-40% to-red-700',
    ' bg-radial from-purple-400 from-40% to-pink-700',
    ' bg-radial from-cyan-400 from-40% to-blue-700',

  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='w-full h-full flex flex-col  gap-6   rounded-lg py-2'>
      <div className='flex flex-row gap-6 w-full h-1/4  justify-around items-center'>
        {data.map((item, index) => (
          <div
            className='flex flex-1  items-center gap-6 bg-neutral-900 border  border-neutral-800  p-4   hover:shadow-lg transition-all duration-300 ease-in-out '
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
            <div className={` p-2 ${item.title === 'Total Revenue' ? 'bg-green-400' : item.title === 'Total Orders' ? 'bg-sky-400' : item.title === 'Pending Orders' ? 'bg-yellow-400' : item.title === 'Total Products' ? 'bg-purple-400' : 'bg-gray-400'} rounded-2xl`}>
              {item.icon}
            </div>


          </div>
        ))}
      </div>

      <div className='flex flex-row  gap-4 w-full h-300  '>

        <div className='flex-1 mt-4 bg-neutral-900 shadow      '>
          <div className='flex justify-between items-center p-4 '>
            <div>
              <h2 className='font-semibold text-sm'>Recent Orders</h2>
              <p className='text-xs text-neutral-400'>Latest orders from your store</p>
            </div>
            <div className='flex items-center gap-2 text-xs text-red-600 cursor-pointer hover:text-red-500 transition-colors duration-300'>
              <p className='font-bold'>View all</p>
              <span className="rotate-45">
                <ArrowUpIcon size={16} />
              </span>
            </div>
          </div>

          <table className='w-full   '>
            <thead className='border-none '>
              <tr className=' rounded-t-lg overflow-hidden border-none'>


                <th className='px-1 md:px-4 py-2 text-left text-sm font-medium text-neutral-400'>Customer</th>
                <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-neutral-400'>Items</th>
                <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-neutral-400'>City</th>



                <th className='px-1 md:px-4  py-2 text-center text-sm font-medium text-neutral-400'>Status</th>
                <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-bold text-neutral-400'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent6Orders.map((order, index) => (
                <tr

                  key={index} className='  border-t border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300'>


                  <td className='px-1 md:px-4 py-5 text-sm text-white'>
                    <div className='flex items-center gap-2'>
                      <div className={`rounded-full  ${bggradientcolors[index]}  size-8 flex justify-center items-center`}>
                        <p className='text-white text-sm font-bold'>
                          {order.shippingAddress.fullName[0]}
                        </p>

                      </div>
                      <div>
                        <p className='text-sm'>{order.shippingAddress.fullName}</p>
                        <p className='text-xs text-neutral-400'>{order.email}</p>
                      </div>

                    </div>
                  </td>
                  <td className='hidden md:table-cell px-4 py-2  text-sm text-neutral-400'>{order.items.length}</td>
                  <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{order.shippingAddress.city}</td>



                  <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                    <div
                      className='flex justify-center items-center'

                    ><p className={`p-1 px-3 rounded text-xs tracking-tighter text-black ${order.status === 'Pending' ? 'bg-yellow-500' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`}>{order.status}</p></div>
                  </td>
                  <td className='hidden md:table-cell px-4 py-2 font-bold text-sm text-white'>{order.payableAmount} PKR</td>

                </tr>
              ))}

              {/* More orders can be added here */}
            </tbody>

          </table>
        </div>

        <div className=' rounded flex justify-center items-center mt-4 bg-neutral-900 w-1/3 h-150 '>
          <DoughnutChart />
        </div>
      </div>
    </motion.div>
  )
}