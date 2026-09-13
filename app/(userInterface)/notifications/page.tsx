'use client'
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { markAsRead, MarkNotificationsAsRead } from '@/app/store/slices/settingSlice'
import { ChartNoAxesCombined, Megaphone, Package, Settings, ShoppingCart, Store, Tag } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {
  const notifications = useSelector((state) => state.setting.notifications)
  const unreadNotifications = notifications.filter((notification) => notification.isRead === false)
  const dispatch = useDispatch()
  console.log("notifications in notification page", notifications)
  const tempnotfications = [
    {

      // notification types ['General', 'Order', 'Coupon','Product','Growth',"System", 'Promotional']
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: false,
      message: "Fantastic! You've achieved a significant milestone by adding 10 products to your store. Your dedication and hard work are paying off. Keep up the great work!",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      type: "Growth",
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd653"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: true,
      type: "Order",
      message: "You have a new order! Order ID: 12345. Please check your store panel for more details.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd654"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: false,
      type: "General",
      message: "Your store has been successfully updated with the latest features. Explore the new functionalities and enhance your store's performance.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd655"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: false,
      type: "Coupon",
      message: "A new coupon has been validated for your store! and customer saved the coupon code. Check your store panel for details.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd656"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: true,
      type: "Promotional",
      message: "Exciting news! A new promotional campaign has been launched for your store. Check your store panel to see the details and take advantage of this opportunity.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd657"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: true,
      type: "System",
      message: "System maintenance is scheduled for tomorrow from 2 AM to 4 AM. During this time, your store may be temporarily unavailable. We apologize for any inconvenience caused.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd658"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: false,
      type: "Product",
      message: "A new product has been added to your store! Check your store panel to see the details and manage the product.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd659"
    },
    {
      createdAt: "2026-09-04T15:05:21.526Z",
      isRead: true,
      type: "Order",
      message: "You have a new order! Order ID: 67890. Please check your store panel for more details.",
      recipientid: "6a9adbe7eab7886a815c569b",
      storeID: "6a9adbe7eab7886a815c569b",
      data: {},
      updatedAt: "2026-09-04T15:05:21.526Z",
      __v: 0,
      _id: "6a9ade31bdfb229b381cd660"
    },

  ]
  useEffect(() => {
    return () => {
      dispatch(MarkNotificationsAsRead(unreadNotifications));
      unreadNotifications.forEach(notification => {
        dispatch(markAsRead(notification._id));
      });
    }
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col gap-4 w-full min-w-0'
    >
      <PageStarter />
      <div className='flex flex-col gap-2'>
        {notifications.length === 0 ? (
          <p className='text-gray-400'>No notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className={`flex justify-start items-center gap-3 md:gap-4 ${notification.isRead ? 'bg-neutral-900' : 'bg-red-900/20'} p-3 md:p-4  border border-gray-700`}>

              {notification.type === 'Order' ?
                <div className='flex justify-center items-center p-2 shrink-0 bg-red-500 rounded-md '>
                  <ShoppingCart size={20} />
                </div>
                :
                notification.type === 'General' ?
                  <div className='flex justify-center items-center p-2 shrink-0 bg-purple-500 rounded-md '>
                    <Store size={20} />
                  </div>
                  :
                  notification.type === 'Growth' ?
                    <div className='flex justify-center items-center p-2 shrink-0 bg-green-500 rounded-md '>
                      <ChartNoAxesCombined size={20} />
                    </div>
                    :
                    notification.type === 'System' ?
                      <div className='flex justify-center items-center p-2 shrink-0 bg-blue-500 rounded-md '>
                        <Settings size={20} />
                      </div>
                      :
                      notification.type === 'Product' ?
                        <div className='flex justify-center items-center p-2 shrink-0 bg-violet-500 rounded-md '>
                          <Package size={20} />
                        </div>
                        :
                        notification.type === 'Coupon' ?
                          <div className='flex justify-center items-center p-2 shrink-0 bg-yellow-500 rounded-md '>
                            <Tag size={20} />
                          </div>
                          :
                          notification.type === 'Promotional' ?
                            <div className='flex justify-center items-center p-2 shrink-0 bg-cyan-500 rounded-md '>
                              <Megaphone size={20} />

                            </div>
                            :
                            null}

              <div className='flex flex-col  w-full min-w-0'> <p className='text-white text-sm wrap-break-word'>{notification.message}</p>
                <p className='text-gray-400 text-xs self-end'>
                  {(() => {
                    const hoursAgo = Math.floor((Date.now() - new Date(notification.createdAt).getTime()) / (1000 * 60 * 60));

                    if (hoursAgo < 1) {
                      const minutesAgo = Math.floor((Date.now() - new Date(notification.createdAt).getTime()) / (1000 * 60));
                      return `${minutesAgo} minutes ago`;
                    } else if (hoursAgo < 24) {
                      return `${hoursAgo} hours ago`;
                    } else {
                      const daysAgo = Math.floor(hoursAgo / 24);
                      return `${daysAgo} days ago`;
                    }
                  })()}
                </p>
              </div>


            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}
