'use client'
import { store } from '@/app/store/store'
import { Provider } from 'react-redux'
import React from 'react'

export default function ClientShell({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <div className=' bg-neutral-100  relative w-full '>
      {children}
      </div>
    </Provider>
  )
}
