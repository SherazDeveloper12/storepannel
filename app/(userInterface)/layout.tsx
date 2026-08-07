'use client'
import React from 'react'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/components/navigation'

export default function layout({ children }: { children: React.ReactNode }) {
 const {user, isAuthenticated} = useSelector((state: RootState) => state.auth)
 const router = useRouter()
 if (!isAuthenticated) {
    router.push('/verifyotp')
 }
 if (!user) {
    router.push('/login')
 }
    return (
    <>
        {children}
    </>
  )
}
