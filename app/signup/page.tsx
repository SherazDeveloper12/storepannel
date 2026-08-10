'use client'
import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner';
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
    const {user, loading, error} = useSelector((state: any) => state.auth);
  const router = useRouter();
    useEffect(() => {
        
        if (error) {
            toast.error(error);
        }
        if (user) {
            toast.success("User registered successfully!");
           router.push('/verifyotp');
        }
        return () => {
            // Cleanup if needed
            toast.dismiss();
        }
    }, [error, user]);
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
    <div className="flex justify-center items-center h-full min-h-screen">
        <Toaster richColors />
        <div className='flex flex-col justify-center bg-white gap-8 p-8 py-6 border border-neutral-300 shadow min-w-96 rounded-xl'>
            {/* <div className='flex flex-col gap-2 text-center p-4 py-8 rounded-xl bg-red-600 '>
                <h1 className='text-white font-semibold  text-4xl'>Store Pannel</h1>

            </div>
            <div className='flex flex-col gap-2 text-center p-4 py-8'>
                <p>We Welcome you to our Store Pannel! Your one time password is given below</p>
                <p className='text-red-600 font-semibold text-xl'>461297</p>
                <p>This code will expire in 05 minutes.</p>
                <p>Please don't share this code with anyone.</p>
            </div> */}

            <div className='flex flex-col gap-2 text-center pt-4 '>
                <h1 className='text-red-600 font-semibold  text-4xl'>Store Panel</h1>
                <h2 className='text-sm text-neutral-600 max-w-70 m-auto'>Please sign up for your account. </h2>
            </div>
            <div className='flex flex-col gap-4 pb-4'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                    <input type="text" onChange={(e) => setFormData({...formData, userName: e.target.value})} placeholder='Username' className='border border-neutral-300 rounded p-2' />
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
