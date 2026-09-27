'use client'
import React, { useEffect } from 'react'
import { getme } from '../store/slices/authSlice'
import { useAppDispatch } from '../store/hooks'

export default function layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getme())
    }, [])
  return (
    <>{children}</>
  )
}
