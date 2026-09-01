'use client'
import PageStarter from '@/app/components/PageStarter/PageStarter'
import Selection from '@/app/components/Selection/Selection'
import { contactCustomer } from '@/app/store/slices/customerSlice'
import { motion } from 'motion/react'
import { div } from 'motion/react-m'
import React, { use, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {
  const selectedCustomer = useSelector((state) => state.customer.selectedcustomer)
  
 console.log("selected customer in send email page", selectedCustomer)
  const dispatch = useDispatch();
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [selectedEmail, setSelectedEmail] = React.useState('');
  const customers = useSelector((state) => state.customer.customers)
  const sendemailhandler = () => {
    
    dispatch(contactCustomer({ customerEmail: selectedEmail, subject, message: body }));
  setSubject('');
  setBody('');
  setSelectedEmail('');
  }
useEffect(() => {
    if (selectedCustomer) {
      setSelectedEmail(selectedCustomer.email);
    }
}, [selectedCustomer])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col gap-4'
    >
      <PageStarter />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendemailhandler();
        }}
        className='flex flex-col gap-4 '>

        <div className='flex flex-col gap-1'>
          <p className=''>Select Customer:</p>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className='bg-neutral-900 border border-gray-700  p-1 w-full'>
            <option className='bg-neutral-900' value="" disabled selected={selectedCustomer === null}>
              Customer to send email
            </option>
            {customers.map((customer, index) => (
              <option key={index} value={customer.email} >
                {customer.email}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <p>Subject:</p>
          <input
          value={subject} onChange={(e) => setSubject(e.target.value)} required
          className='bg-neutral-900 border border-gray-700  p-1 w-full' type="text" placeholder='Enter the subject of the email' />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Body:</p>
          <textarea
          value={body} onChange={(e) => setBody(e.target.value)} required
          rows={7} className='bg-neutral-900 border border-gray-700  p-1 w-full' placeholder='Enter the body of the email' />
        </div>
        <div className='flex w-full pt-1'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='bg-red-700 cursor-pointer text-white relative font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-full'
          >

            Send
          </motion.button>
        </div>

      </form>
    </motion.div>
  )
} 