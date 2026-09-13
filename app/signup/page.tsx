'use client'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { useRouter } from 'next/dist/client/components/navigation';
interface FormData {
    userName: string;
    storeName: string;
    email: string;
    password: string;
}
export default function page() {
    const {user, loading, } = useSelector((state: any) => state.auth);
  const router = useRouter();
    useEffect(() => {
        
       
        if (user) {
           
           router.push('/verifyotp');
        }
       
    }, [user]);
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState<FormData>({
        userName: '',
        storeName: '',
        email: '',
        password: ''
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(formData));
        // Handle form submission logic here
       
    }
  return (
    <div className="flex justify-center items-center h-full min-h-screen px-4 py-6">

        <div className='flex flex-col justify-center bg-white gap-4 sm:gap-8 p-4 sm:p-8 sm:py-6 border border-neutral-300 shadow w-full max-w-96 rounded-xl'>


            <div className='flex flex-col gap-2 text-center pt-4 '>
                <h1 className='text-red-600 font-semibold  text-3xl sm:text-4xl'>Store Panel</h1>
                <h2 className='text-sm text-neutral-600 max-w-70 m-auto'>Please sign up for your account. </h2>
            </div>
            <div className='flex flex-col gap-4 pb-4'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-black '>
                    <input type="text" onChange={(e) => setFormData({...formData, userName: e.target.value})} placeholder='Username' className='border border-neutral-300 rounded p-2 ' />
                    <input type="text" onChange={(e) => setFormData({...formData, storeName: e.target.value})} placeholder='Store Name' className='border border-neutral-300 rounded p-2' />
                    <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder='Email' className='border border-neutral-300 rounded p-2' />
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder='Password' className='border border-neutral-300 rounded p-2' />
                 
                    
                    <button type="submit" disabled={loading} className={`bg-red-500 hover:bg-red-700 cursor-pointer text-white  p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Signing up...' : 'Sign up'}</button>
                 <h2 className='text-sm text-neutral-600'>Already have an account? <a href="/login" className='text-red-600'>Login</a></h2>
                </form>
                <p className='text-sm text-neutral-600 text-center'>or</p>
                <button  className='bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-neutral-600  p-2 rounded border border-neutral-300'>Continue as a Guest</button>
            </div>
        </div>
    </div>
  )
}
