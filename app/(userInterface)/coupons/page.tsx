'use client'
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { createCoupon, deleteCoupon, updateCoupon, addSelectedCouponId } from '@/app/store/slices/couponSlice'
import { RootState } from '@reduxjs/toolkit/query/react'
import { Delete, Eye, Pen, ShieldX, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'

export default function page() {
  const { Coupons, status, error, message, SelectedCouponId } = useSelector((state: RootState) => state.coupon);
  const selectedCoupon = Coupons.find(coupon => coupon._id === SelectedCouponId);
  const reversedCoupons = Coupons.toReversed()
 useEffect(() => {
  if (SelectedCouponId){
    setCouponFormData({
      couponName: selectedCoupon?.couponName || '',
      couponCode: selectedCoupon?.couponCode || '',
      discountPercentage: selectedCoupon?.discountPercentage || 1,
      expirationDate: selectedCoupon?.expirationDate ,
      maxUsage: selectedCoupon?.maxUsage || 1,
    })
    setGenerateCoupon(true);
  }
 },[SelectedCouponId])
  const [GenerateCoupon, setGenerateCoupon] = useState(false)
  const dispatch = useDispatch();
  const [couponFormData, setCouponFormData] = useState({
    couponName: '',
    couponCode: '',
    discountPercentage: 1,
    expirationDate: '',
    maxUsage: 1,
  });
  const handleFormSubmit = (e) => {
    e.preventDefault(true);
    SelectedCouponId ? dispatch(updateCoupon({ ...couponFormData, _id: SelectedCouponId })) : dispatch(createCoupon(couponFormData));
    
    setCouponFormData({
      couponName: '',
      couponCode: '',
      discountPercentage: 0,
      expirationDate: '',
      maxUsage: 1,
    });
    setGenerateCoupon(false);
  }
  const handleExpireCoupon = (coupon) => {
    // Implement the logic to expire the coupon
    const expiredCoupon = { ...coupon, status: 'expired' };
    dispatch(updateCoupon(expiredCoupon));
  }
  return (
    <motion.div
          initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
       >
    <div className='w-full min-w-0 flex flex-col gap-4'>

      {GenerateCoupon ?
        <div className='flex flex-col  gap-2'>
          <h1 className='text-xl font-semibold  '>Generate a Coupon to give discounts</h1>

          <form
            onSubmit={(e) => handleFormSubmit(e)}

            className='flex gap-2 bg-neutral-800 p-3 md:p-4 rounded w-full'>

            <div className='flex flex-col gap-2 flex-1 w-full min-w-0'>
              <div className='flex flex-col gap-2 flex-1 w-full '>
                <label htmlFor="itemname" className='font-semibold'>Enter Coupon Name:</label>
                <input value={couponFormData.couponName} type="text" id="itemname" placeholder={`14 August Special`} onChange={(e) => setCouponFormData({ ...couponFormData, couponName: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                <label htmlFor="itemDescription" className='font-semibold'>Enter Coupon Code:</label>
                <input value={couponFormData.couponCode} type="text" id="itemDescription" placeholder={`COUPON14`} onChange={(e) => setCouponFormData({ ...couponFormData, couponCode: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                <label htmlFor="itemDescription" className='font-semibold'>Enter Discount Percentage:</label>
                <input value={couponFormData.discountPercentage} type="number" id="itemDescription" placeholder={`20`} onChange={(e) => setCouponFormData({ ...couponFormData, discountPercentage: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                <label htmlFor="itemDescription" className='font-semibold'>Enter Expiration Date:</label>
                <input value={couponFormData.expirationDate} type="date" id="itemDescription" onChange={(e) => setCouponFormData({ ...couponFormData, expirationDate: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
                <label htmlFor="itemDescription" className='font-semibold'>Enter Maximum Usage:</label>
                <input value={couponFormData.maxUsage} type="number" id="itemDescription" placeholder={`1`} onChange={(e) => setCouponFormData({ ...couponFormData, maxUsage: e.target.value })} className='border border-neutral-300 bg-neutral-900 rounded p-2' />
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <button className='flex-1 bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
                  type='submit'
                >{SelectedCouponId ? 'Update' : 'Create'}</button>
                <button
                  onClick={() => setGenerateCoupon(false)}
                  className='flex-1 bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 sm:ml-2'

                >Cancel</button>
              </div>
            </div>



          </form>

        </div>
        :
        <div className='flex flex-wrap justify-between items-center gap-3'>
          <PageStarter />
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGenerateCoupon(true)}
              className='bg-red-700 cursor-pointer text-white relative font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300'
            >

              Generate Coupon
            </motion.button>
          </div>
        </div>
      }
      <div className='mt-4 bg-neutral-900 shadow     overflow-x-scroll md:overflow-auto'>
        <table className='w-full table-auto border  border-neutral-700'>
          <thead>
            <tr className='bg-neutral-800 rounded-t-lg overflow-hidden'>


              <th className='px-1 md:px-4 py-2 text-left text-sm font-medium text-white'>Coupon Name</th>
              <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Coupon Code</th>

              <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Time Used</th>

              <th className='px-1 md:px-4  py-2 text-center text-sm font-medium text-white'>Status</th>
              <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Created </th>
              <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-bold text-white'>Discount</th>
              <th className='px-1 md:px-4  py-2 text-left text-sm font-medium text-white'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* 
              status: { type: String, enum: ['active', 'expired', 'used']
            */}
            {reversedCoupons.map((coupon, index) => (
              <tr
                onClick={() => { }}
                key={index} className='border cursor-pointer border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300'>


                <td className='px-1 md:px-4 py-2text-sm text-white'>
                  {coupon.couponName}
                </td>
                <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{coupon.couponCode}</td>

                <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{coupon.usedtimes} / {coupon.maxUsage}</td>

                <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                  <div
                    className='flex justify-center items-center'

                  ><p className={`p-1 px-3 rounded text-sm tracking-tighter text-black ${coupon.status === 'active' ? 'bg-green-500' : coupon.status === 'expired' ? 'bg-red-500' : coupon.status === 'used' ? 'bg-yellow-500' : 'bg-grey-500'}`}>{coupon.status}</p></div>
                </td>
                <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{new Date(coupon.createdAt).toLocaleDateString()}</td>
                <td className='hidden md:table-cell px-4 py-2 font-bold text-sm text-white'>{coupon.discountPercentage}%</td>
                <td className='px-1 md:px-4 flex gap-1  items-center py-2  text-sm text-white  '>
                  <div className='flex flex-col md:flex-row   items-center'>
                    <Pen onClick={() => {dispatch(addSelectedCouponId(coupon._id)) }} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                  </div>
                  <div className='flex flex-col md:flex-row   items-center'>
                    <ShieldX onClick={() => {handleExpireCoupon(coupon)}} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                  </div>
                  <div className='flex flex-col md:flex-row   items-center'>
                    <Trash2 onClick={() => {dispatch(deleteCoupon(coupon._id)) }} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                  </div>
                </td>
              </tr>
            ))}

            
          </tbody>

        </table>
      </div>

    </div>
    </motion.div>
  )
}
