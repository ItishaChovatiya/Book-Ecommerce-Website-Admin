import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const User_order_history = () => {
  const [orderHistory , setOrderHistory ] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get("http://localhost:5000/v1/order/getOrder",{headers})
      setOrderHistory(response.data.data);
    }
    fetch()
  },[])
  return (
    <>
      {
        !orderHistory && <div className='flex items-center justify-center h-[100%]'><Loader></Loader></div>
      }
      {
        orderHistory && orderHistory.length === 0 && (
          <div className='h-[80vh] p-4 text-zinc-100'>
            <div className='h-[100%] flex flex-col items-center justify-center'>
              <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
              <img src='https://static.vecteezy.com/system/resources/previews/014/298/148/non_2x/cancel-order-glyph-inverted-icon-free-vector.jpg' alt='no order' className='h-[20vh] mb-8 '></img>
            </div>
          </div>
        )
      }
      {
        orderHistory && orderHistory.length > 0 && (
          <div className='h-[100%] md:p-4 text-zinc-100'>
              <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Order History</h1>
              <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                <div className='w-[3%]'>
                  <h1 className='text-center'>Sr.</h1>
                </div>
                <div className='w-[22%]'>
                  <h1 className=''>books</h1>
                </div>
                <div className='w-[45%]'>
                  <h1 className=''>description</h1>
                </div>
                <div className='w-[9%]'>
                  <h1 className=''>Price</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className=''>Status</h1>
                </div>
                <div className='md:w-[5%] md:block w-none hidden'>
                  <h1 className=''>Mode</h1>
                </div>
              </div>
              {
                orderHistory.map((items, i) =>(
                  <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                    <div className='w-[3%]'>
                      <h1 className='text-center'>{i+1}</h1>
                    </div>
                    <div className='w-[22%]'>
                      <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
                    </div>
                    <div className='w-[45%]'>
                      <h1 className=''>{items.book.description.slice(0,50)}...</h1>
                    </div>
                <div className='w-[9%]'>
                    <h1 className=''>{items.book.price}</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className='font-semibold text-green-500'>{items.status === "Order Placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>) : items.status === "Cancelled" ? (
                      <div className='text-red-500'>{items.status}</div>) : (items.status)
                    }</h1>
                </div>
                <div className='w-none md:w-[5%] hidden md:block'>
                  <h1 className='text-sm text-zinc-400'>COD</h1>
                </div>
                  </div>
                )
                )
              }
          </div>
        )
      }
    </>
  )
}

export default User_order_history
