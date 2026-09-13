'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated,  loading } = useSelector((state: any) => state.auth);
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    useEffect(() => {
     
        if (isAuthenticated) {
         
            router.push('/dashboard');
        }
       
    }, [isAuthenticated, ]);
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(formData));
    };
    
  return (
    <div className="flex justify-center items-center h-full min-h-screen px-4 py-6">

        <div className='flex flex-col justify-center bg-white gap-4 sm:gap-8 p-4 sm:p-8 border border-neutral-300 shadow w-full max-w-96 rounded-xl'>
            <div className='flex flex-col gap-2 text-center pt-2 sm:pt-8 '>
                <h1 className='text-red-600 font-semibold  text-3xl sm:text-4xl'>Store Panel</h1>
                <h2 className='text-sm text-neutral-600 max-w-70 m-auto'>Please sign in to your account. </h2>
            </div>
            <div className='flex flex-col gap-4 pb-0 sm:pb-8'>
                <form onSubmit={handleLogin} className='flex flex-col gap-4 '>
                    <input 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email" placeholder='Email' className='text-black border border-neutral-300 rounded p-2 ' />
                    <input
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password" placeholder='Password' className=' text-black border border-neutral-300 rounded p-2' />
                 
                    <div className='flex flex-wrap justify-between items-center gap-2'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" />
                            <span className='text-sm text-neutral-600'>Remember me</span>
                        </label>
                        <a href="#" className='text-sm text-red-600'>Forgot Password?</a>
                    </div>
                    <button
                    disabled={loading}
                    type="submit" className={` ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'} cursor-pointer text-white  p-2 rounded`}>Login</button>
                 <h2 className='text-sm text-neutral-600 text-center'>Don't have an account? <a href="/signup" className='text-red-600'>Sign up</a></h2>
                </form>
                <p className='text-sm text-neutral-600 text-center'>or</p>
                <button
                
                className='bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-neutral-600  p-2 rounded border border-neutral-300'>Continue as a Guest</button>
            </div>
        </div>
    </div>
  )
}
