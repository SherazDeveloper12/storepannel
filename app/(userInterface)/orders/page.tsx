'use client'
import OrderInvoice from '@/app/components/OrderInvoice/OrderInvoice';
import PageStarter from '@/app/components/PageStarter/PageStarter'
import { clearSelectedOrderId, setSelectedOrderId, updateOrderStatus } from '@/app/store/slices/orderSlice';
import { CircleArrowLeft, CircleDollarSign, Eye,  Package, PackagePlus, ShoppingBag, User } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/dist/client/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function page() {
    useEffect(() => {
        dispatch(clearSelectedOrderId());
    }, []);
    const { orders, selectedOrderId } = useSelector((state: any) => state.orders);
    const selectedOrder = orders.find((order)=> order._id === selectedOrderId);
    const dispatch = useDispatch();
    const reversedOrders = orders.toReversed();
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  

    const [ordercancelationpopup, setOrderCancelationPopup] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState("");
    const [updateingStatus, setUpdatingStatus] = useState(false);
    const [statusToUpdate, setStatusToUpdate] = useState("");
    const handlePrevPage = () => { }
    const handleNextPage = () => { }
    const handleordercancel = (order) => {
        setOrderToCancel(order);
        setOrderCancelationPopup(true);
    }
    const ordercancelconfirmation = () => {
        dispatch(updateOrderStatus({ orderId: orderToCancel._id, newStatus: "Cancelled" }))
        setOrderCancelationPopup(false);
    }
    const handleViewClick = (order) => {
        dispatch(setSelectedOrderId(order));
    }
    const handleUpdateStatus = (order) => {
        
        dispatch(updateOrderStatus({ orderId: order._id, newStatus: statusToUpdate }));

        setUpdatingStatus(false);
        setStatusToUpdate("");

    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >

            <div className='flex flex-col  w-full h-full text-white'>



                {ordercancelationpopup ?
                    <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4'>
                        <div className='bg-neutral-800 p-4 rounded-lg shadow-lg w-full max-w-96'>
                            <h2 className='text-xl font-semibold mb-4'>Cancel Order</h2>
                            <p className='mb-4'>Are you sure you want to cancel this ${orderToCancel.payableAmount} order?</p>
                            <div className='flex justify-end gap-4'>
                                <button
                                    onClick={() => setOrderCancelationPopup(false)}
                                    className='px-4 cursor-pointer py-2 bg-gray-300 text-white rounded'>No</button>
                                <button
                                    onClick={ordercancelconfirmation}
                                    className='px-4 cursor-pointer py-2 bg-red-500 text-white rounded'>Yes</button>
                            </div>
                        </div>
                    </div>
                    : null}


                <div className='flex flex-wrap justify-between items-start gap-3 w-full min-w-0'>
                    {selectedOrder ? <>
                        <div className='flex flex-col gap-2 min-w-0'>
                            <div onClick={() => dispatch(clearSelectedOrderId())} className='flex gap-2 items-center cursor-pointer text-neutral-400'>
                                <CircleArrowLeft color='#FB2C34' className='shrink-0' />
                                <p className='text-red-500'>Back to Orders</p>
                            </div>
                            <h2 className='text-xl font-bold wrap-break-word'> Order ORD-{selectedOrder._id.slice(-6)} </h2>
                            <p className='text-sm text-neutral-400'>Placed on {new Date(selectedOrder.createdAt).toDateString()}</p>
                        </div>
                        <div className='min-w-0'>
                            {updateingStatus ? <>
                                <div className='flex flex-wrap gap-2'>
                                    <select
                                        value={statusToUpdate}
                                        onChange={(e) => setStatusToUpdate(e.target.value)}
                                        className='px-4 py-2 bg-neutral-700 text-white rounded font-bold cursor-pointer'

                                    >
                                        <option value="Pending" >Pending</option>
                                        <option value="Rejected" >Rejected</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped" >Shipped</option>
                                        <option value="Delivered" >Delivered</option>
                                        <option value="Cancelled" >Cancelled</option>
                                    </select>
                                    <button onClick={() => handleUpdateStatus(selectedOrder)} className='px-4 py-2 bg-green-600 text-white rounded font-bold cursor-pointer'>Update</button>
                                    <button onClick={() => setUpdatingStatus(false)} className='px-4 py-2 border border-neutral-500 text-neutral-300 rounded font-bold cursor-pointer'>Cancel</button>
                                </div>
                            </> :
                                <button onClick={() => setUpdatingStatus(true)} className='px-4 py-2 bg-red-600/90 text-white rounded font-bold cursor-pointer'>Update Status</button>

                            }
                        </div>
                    </> : <>
                        <PageStarter />
                        <div className='flex flex-wrap justify-between items-center gap-2 w-full min-w-0'>
                            <h2 className='  text-white'>Total Orders: {orders.length} </h2>

                        </div></>}


                </div>
                {
                    selectedOrder ?
                        <SeclectedOrder order={selectedOrder} />
                        :
                        <div className='mt-4 bg-neutral-900 shadow     overflow-x-scroll md:overflow-auto'>
                            <table className='w-full table-auto border  border-neutral-700'>
                                <thead>
                                    <tr className='bg-neutral-800 rounded-t-lg overflow-hidden'>


                                        <th className='px-1 md:px-4 py-2 text-left text-sm font-medium text-white'>Customer</th>
                                        <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>City</th>

                                        <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Items</th>

                                        <th className='px-1 md:px-4  py-2 text-center text-sm font-medium text-white'>Status</th>
                                        <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-medium text-white'>Date</th>
                                        <th className='hidden md:table-cell px-4 py-2 text-left text-sm font-bold text-white'>Ammount</th>
                                        <th className='px-1 md:px-4  py-2 text-left text-sm font-medium text-white'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reversedOrders.map((order, index) => (
                                        <tr
                                            onClick={() => dispatch(setSelectedOrderId(order._id))}
                                            key={index} className='border cursor-pointer border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300'>


                                            <td className='px-1 md:px-4 py-2text-sm text-white'>
                                                <div className='flex items-center gap-2 min-w-max'>
                                                    <div className='rounded-full   bg-red-950/70 size-8 shrink-0 flex justify-center items-center'>
                                                        <p className='text-red-500 text-sm font-bold'>
                                                            {order.shippingAddress.fullName[0]}
                                                        </p>

                                                    </div>
                                                    <div className='min-w-0'>
                                                        <p className='text-sm truncate max-w-40'>{order.shippingAddress.fullName}</p>
                                                        <p className='text-xs text-neutral-400 truncate max-w-40'>{order.email}</p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{order.shippingAddress.city}</td>

                                            <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{order.items.length}</td>

                                            <td className={`px-1 md:px-4 py-2  text-sm text-white `}>
                                                <div
                                                    className='flex justify-center items-center'

                                                ><p className={`p-1 px-3 rounded text-sm tracking-tighter text-black ${order.status === 'Pending' ? 'bg-yellow-500' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`}>{order.status}</p></div>
                                            </td>
                                            <td className='hidden md:table-cell px-4 py-2  text-sm text-white'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className='hidden md:table-cell px-4 py-2 font-bold text-sm text-white'>{order.payableAmount} PKR</td>
                                            <td className='px-1 md:px-4  py-2  text-sm text-white  '>
                                                <div className='flex flex-col md:flex-row   items-center'>
                                                    <Eye onClick={() => handleViewClick(order)} size={16} className='text-neutral-400 hover:text-white cursor-pointer transform hover:scale-110 duration-100' />

                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* More orders can be added here */}
                                </tbody>
                                {/* <tfoot >
                                    <tr className='bg-neutral-800 rounded-b-lg w-full '>
                                        <td colSpan={10}>
                                            <div className='flex justify-center items-center w-full '>
                                                <button
                                                    onClick={handlePrevPage}
                                                    disabled={currentPage === 1}
                                                    className='px-4 py-2 bg-gray-300 text-white rounded mr-2 disabled:opacity-50 cursor-pointer'>Previous</button>
                                                <p className='mx-2 text-sm text-gray-600'>{currentPage} of {totalPages} pages</p>
                                                <button
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages}
                                                    className='px-4 py-2 bg-gray-300 text-white rounded disabled:opacity-50 cursor-pointer'>Next</button>

                                            </div>
                                        </td>
                                    </tr>
                                </tfoot> */}
                            </table>
                        </div>
                }

            </div>
        </motion.div>
    )
}


function SeclectedOrder({ order }) {
    console.log("Selected Order:", order);
    return (


        <div className='flex items-start py-4 w-full min-w-0 gap-4 lg:gap-6 justify-start flex-wrap '>
            <div className='flex flex-col gap-4 bg-neutral-800 p-4 rounded-lg shadow-lg w-full min-w-0 md:w-auto md:min-w-76 border border-neutral-700'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <Package size={16} className='text-neutral-400' />
                        <h2 className='font-bold'>Order Details</h2>

                    </div>
                    <p className='text-sm text-neutral-400'>Core Order Information</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Order ID</p>
                        <p>{order._id.slice(-6)}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Order Status</p>
                        <p className={`text-black p-1 px-3 rounded ${order.status === 'Pending' ? 'bg-yellow-500' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`}>{order.status}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Date</p>
                        <p>{new Date(order.createdAt).toDateString()}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Ammount</p>
                        <p>${order.payableAmount}</p>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-4 bg-neutral-800 p-4 rounded-lg shadow-lg  w-full min-w-0 md:w-auto md:min-w-76 border border-neutral-700'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <User size={16} className='text-neutral-400' />
                        <h2 className='font-bold'>Customer Details</h2>
                    </div>
                    <p className='text-sm text-neutral-400'>Customer Information</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full   bg-red-950/70 size-12 shrink-0 flex justify-center items-center'>
                                <p className='text-red-500 text-sm font-bold'>
                                    {order.shippingAddress.fullName[0]}
                                </p>

                            </div>
                            <div className='min-w-0'>
                                <p className='truncate'>{order.shippingAddress.fullName}</p>
                                <p className='text-sm text-neutral-400 truncate'>{order.email}</p>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Address</p>
                        <p className='text-right min-w-0 flex-1 md:flex-none md:w-48 ' >{order.shippingAddress.addressLine1}, {order.shippingAddress.city}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Phone</p>
                        <p>{order.phoneNumber}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 bg-neutral-800 p-4 rounded-lg shadow-lg  w-full min-w-0 md:w-auto md:min-w-76 border border-neutral-700'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <ShoppingBag size={16} className='text-neutral-400 shrink-0' />
                        <h2 className='font-bold'>Product Details</h2>
                    </div>
                    <p className='text-sm text-neutral-400'>Purchased Product Information</p>
                </div>
                <div>
                    {order.items.map((item, index) => (<>
                        <div key={index} className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                            <p className='text-neutral-400'>Name</p>
                            <p className='text-right min-w-0 flex-1 md:flex-none md:w-48'>{item.product.heading}</p>
                        </div>
                        <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                            <p className='text-neutral-400'>Price</p>
                            <p>{item.product.price}</p>
                        </div></>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-2 bg-neutral-800 p-4 rounded-lg shadow-lg  w-full min-w-0 md:w-auto md:min-w-76 border border-neutral-700'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>

                        <CircleDollarSign size={16} className='text-neutral-400 shrink-0' />
                        <h2 className='font-bold'>Payment Details</h2>
                    </div>
                    <p className='text-sm text-neutral-400'>Payment Methods Used</p>
                </div>
                <div>

                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Payment Method</p>
                        <p className='text-right min-w-0 flex-1 md:flex-none md:w-48'>{order.paymentMethod}</p>
                    </div>
                    {order.paymentMethod !== "cod" && 
                    <div className='flex justify-between items-center gap-2  border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400 '>Payment Receipt</p>
                        <Link href={order.paymentReceipt} target='_blank' className='  text-right cursor-pointer   text-neutral-400 hover:text-2xl hover:text-white transition-all duration-300'>
                        <Eye size={24} className=' ' />
                        </Link>
                        
                    </div>
                    }
                    
                    <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                        <p className='text-neutral-400'>Coupon Applied </p>
                        <p>{order.couponApplied ? 'Yes' : 'No'}</p>
                    </div>
                    {order.couponApplied &&
                        <div className='flex justify-between items-center gap-2 border-b border-neutral-700 py-2'>
                            <p className='text-neutral-400'>Discount  </p>
                            <p>{`${order.couponDiscount} %`} </p>
                        </div>
                    }
                </div>
            </div>


        </div>


    )
}