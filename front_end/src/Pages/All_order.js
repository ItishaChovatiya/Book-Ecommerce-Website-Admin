import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader/Loader'
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const All_order = () => {
    
    const [allOrder,setallOrder] = useState([])
    const [value,setValue] = useState({status:""})
    const [options,setoptions] = useState(-1)
    const [userDiv,setUserDiv] = useState("hidden")
    const [userDivData,setUserDivData] = useState()
    

    const headers = {
        id : localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}`
      }
    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get("http://localhost:5000/v1/order/get-all-orders",{headers})
            setallOrder(response.data.data)
    }
    fetch()
        },[allOrder])

   

    const change = (e) => {
        const {value } = e.target
        setValue({status:value})
    }

    const submitChanges = async(i) => {
        const id = allOrder[i]._id
        const response = await axios.put(`http://localhost:5000/v1/order/update-status/${id}`,value,{headers})
        alert(response.data.messages)
    }
    

    allOrder && allOrder.splice(allOrder.length - 1, 1)
  return (
   <>
        {
            !allOrder && <div className='h-[100%] flex items-center justify-center'><Loader></Loader>{" "}</div>
            
        }
        {
            allOrder && allOrder.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Order</h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2 flex'>
                    <div className='w-[3%]'>
                  <h1 className='text-center'>Sr.</h1>
                </div>
                <div className='w-[20%] w-[22%]'>
                  <h1 className=''>books</h1>
                </div>
                <div className='w-[40%] md:block'>
                  <h1 className=''>description</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                  <h1 className=''>Price</h1>
                </div>
                <div className='w-[25%] md:w-[16%]'>
                  <h1 className=''>Status</h1>
                </div>
                <div className='md:w-[5%] w-[10%]'>
                  <h1 className=''><FaUserLarge /></h1>
                </div>
                </div>
                {allOrder.map((items,i) => (
                    <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:curser-pointer transition-all duration-300' key={i}>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>{i + 1}</h1>    
                        </div>  
                        <div className='w-[40%] md:w-[22%]'>
                            <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>    
                        </div>  
                        <div className='w-0 md:w-[45%] hidden md:block'>
                            <h1 className=''>{items.book.description.slice(0,50)}...</h1>
                        </div>
                        <div className='w-[17%] md:w-[9%]'>
                            <h1>{items.book.price}</h1>
                        </div>
                        <div className='w-[30%] md:w-[16%]'>
                            <h1 className='font-semibold'>
                                <button onClick= {() => setoptions(i)}   className='hover:scale-105 transition-all duration-3000'>{items.status === "Order placed" ? (<div       className='text-yellow-500'>{items.status}</div>) : items.status === "Canceled" ? (
                                <div className='text-red-500'>{items.status}</div>) : (<div className='text-green-500'>{items.status}</div>)}
                                </button>
                                        { options === i && (<div className={`$(options === i ? "flex" : "hidden")`}>
                                            <select name='status' id = "" className='bg-gray-800' onChange={change} value={value.status}>{["Order placeded","Out of delivery","Delived","Cancelled"].map((items,i) => (
                                                <option key={i} value={items}>{items}</option>
                                            ))}
                                            </select>
                                            <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => {setoptions(-1); submitChanges(i)}}>
                                                <FaCheck />
                                            </button>
                                        </div>)}
                                    </h1>
                                    </div>
                                <div className='w-[10%] md:w-[5%]'>
                                    <button className='text-xl hover:text-orange-500' onClick={() => {
                                        setUserDiv("fixed")
                                        setUserDivData(items.user)
                                    }}>
                                    <IoOpenOutline />
                                    </button>
                                </div>
                     </div>   
                ))}
                </div>
                        ) }
             {userDivData && (<SeeUserData userDivData = {userDivData} userDiv= {userDiv} setUserDiv = {setUserDiv}></SeeUserData>) }
   </>
  )
}

export default All_order
