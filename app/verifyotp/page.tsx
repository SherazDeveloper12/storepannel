'use client'
import React, { useEffect, useRef } from 'react'
import { Toaster, toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/components/navigation';
import { otpSend, otpVerify } from '../store/slices/authSlice';


export default function page() {
    const {user, loading, message, error, isAuthenticated} = useSelector((state: any) => state.auth);
    
    const dispatch = useDispatch();
    const otphasbeenSent = useRef(false);
    const [formData, setFormData] = React.useState({
        otp: '',
        email: user?.email
    });
     
    useEffect(() => {
        if (!otphasbeenSent.current) {
            dispatch(otpSend(user?.email));
            otphasbeenSent.current = true;
        }
    }, []);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (message) {
            toast.success(message);
        }
       
    }, [error, message, isAuthenticated]);
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        dispatch(otpVerify(formData));
    }
  return (
       <div className="flex justify-center items-center h-full min-h-screen">
        <Toaster richColors />
        <div className='flex flex-col justify-center bg-white gap-8 p-8 border border-neutral-300 shadow min-w-96 rounded-xl'>
            <div className='flex flex-col gap-2 text-center pt-4 '>
                <h1 className='text-red-600 font-semibold  text-4xl'>Store Pannel</h1>
                <h2 className='text-sm text-neutral-600 max-w-70 m-auto'>Please verify your OTP send at your email. </h2>
            </div>
            <div className='flex flex-col gap-4 pb-4'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                    <input type="text" onChange={(e) => setFormData({...formData, otp: e.target.value})} placeholder='OTP' className='border border-neutral-300 rounded p-2' />
                 
                    
                    <button type="submit" disabled={loading} className={`bg-red-500 hover:bg-red-700 cursor-pointer text-white  p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
                 
                </form>
                  </div>
        </div>
    </div>
  )
}
