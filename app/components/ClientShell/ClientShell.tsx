'use client'
import { store } from '@/app/store/store'
import { Provider } from 'react-redux'
import React from 'react'

export default function ClientShell({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <div className='min-h-full flex flex-col bg-neutral-100'>
      {children}
      </div>
    </Provider>
  )
}
