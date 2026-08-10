'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getme } from '../store/slices/authSlice'

export default function layout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getme())
    }, [])
  return (
    <>{children}</>
  )
}
