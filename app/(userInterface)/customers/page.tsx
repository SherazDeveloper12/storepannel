"use client"
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { setSelectedcustomer } from '@/app/store/slices/customerSlice'
import { RootState } from '@reduxjs/toolkit/query/react'
import { Eye, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const customers = useSelector((state: RootState) => state.customer.customers)
    const reversedCustomers = customers.toReversed()
    console.log("customers in customer page", reversedCustomers)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='w-full min-w-0'
        >
            <div>
                <PageStarter />
            </div>
            <div className='mt-4 bg-neutral-900 shadow     overflow-x-scroll md:overflow-auto'>
                <table className='w-full table-auto border  border-neutral-700'>
                    <thead>
                        <tr className='bg-neutral-800 rounded-t-lg overflow-hidden'>


                            <th className='px-1 md:px-4 py-2 text-left text-sm font-medium text-white'>Name</th>
                            <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>City</th>

                            <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Orders</th>

                            <th className='px-1 md:px-4  py-2 text-center text-sm font-medium text-white'>Email</th>
                            <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Phone Number</th>
                            <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-bold text-white'> Since</th>
                            <th className='px-1 md:px-4  py-2 text-left text-sm font-medium text-white'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reversedCustomers.map((customer, index) => (
                            <tr
                                onClick={() => dispatch(setSelectedCustomer(customer))}
                                key={index} className='border cursor-pointer border-neutral-700 bg-neutral-900  hover:bg-neutral-800 transition-colors duration-300'>


                                <td className='px-1 md:px-4 py-2 text-sm text-white'>
                                    <div className='flex items-center gap-2'>
                                        <div className='rounded-full   bg-red-950/70 size-8 shrink-0 flex justify-center items-center'>
                                            <p className='text-red-500 text-sm font-bold'>
                                                {customer.name[0].toUpperCase()}
                                            </p>

                                        </div>
                                        <div>
                                            <p className='text-sm'>{customer.name}</p>

                                        </div>

                                    </div>
                                </td>
                                <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{customer.city}</td>

                                <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{customer.totalOrders}</td>

                                <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                                    {customer.email}
                                </td>
                                <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                                    {customer.phoneNumber}
                                </td>
                                <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                                    {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className='px-1 md:px-4  py-2  text-sm text-white  '>
                                    <div className='flex flex-col md:flex-row gap-2  items-center'>
                                        {/* <Eye onClick={() => handleViewClick(customer)} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' /> */}
                                        <Mail onClick={() => {dispatch(setSelectedcustomer(customer), router.push('/send-emails'))} } 
                                            size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100 ' />
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* More orders can be added here */}
                    </tbody>

                </table>
            </div>
        </motion.div>
    )
}
