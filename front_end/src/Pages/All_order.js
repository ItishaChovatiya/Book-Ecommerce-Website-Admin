import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const All_order = () => {
    /* State to hold all orders fetched from the API */
    const [allOrder, setAllOrder] = useState([]);
    
    /* State to manage the selected status for updating an order*/
    const [value, setValue] = useState({ status: "" });
    
    /* State to manage which order is currently being edited*/
    const [options, setOptions] = useState(-1);
    
    /* State to control the visibility of the user detail modal*/
    const [userDiv, setUserDiv] = useState("hidden");
    
   /*State to hold the user data for the modal*/
    const [userDivData, setUserDivData] = useState();

    /* Headers for API requests*/
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    /* Fetch all orders when the component mounts*/
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:5000/v1/order/get-all-orders", { headers });
            setAllOrder(response.data.data);
        };
        fetch();
    }, []); /* Empty dependency array to ensure this effect runs only once*/

   /* Handle status change from dropdown*/
    const change = (e) => {
        const { value } = e.target;
        setValue({ status: value });
    };

    /*Submit changes to the order status*/
    const submitChanges = async (i) => {
        const id = allOrder[i]._id;
        const response = await axios.put(`http://localhost:5000/v1/order/update-status/${id}`, value, { headers });
        alert(response.data.messages);
    };

    /* Remove the last item from the list (if needed)*/
    if (allOrder.length > 0) {
        allOrder.splice(allOrder.length - 1, 1);
    }

    return (
        <>
            {
                /* Show loader if allOrder is empty or not yet fetched*/
                !allOrder.length ? 
                <div className='h-[100%] flex items-center justify-center'><Loader /></div> :
                
                /* Render order list if orders are available*/
                allOrder.length > 0 && (
                    <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>
                        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2 flex'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>Sr.</h1>
                            </div>
                            <div className='w-[22%]'>
                                <h1>Books</h1>
                            </div>
                            <div className='w-0 md:w-[45%] hidden md:block'>
                                <h1>Description</h1>
                            </div>
                            <div className='w-[9%]'>
                                <h1>Price</h1>
                            </div>
                            <div className='w-[16%]'>
                                <h1>Status</h1>
                            </div>
                            <div className='w-[10%]'>
                                <h1><FaUserLarge /></h1>
                            </div>
                        </div>
                        {allOrder.map((items, i) => (
                            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 cursor-pointer transition-all duration-300' key={i}>
                                <div className='w-[3%]'>
                                    <h1 className='text-center'>{i + 1}</h1>
                                </div>
                                <div className='w-[22%]'>
                                    <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
                                </div>
                                <div className='w-0 md:w-[45%] hidden md:block'>
                                    <h1>{items.book.description.slice(0, 50)}...</h1>
                                </div>
                                <div className='w-[9%]'>
                                    <h1>{items.book.price}</h1>
                                </div>
                                <div className='w-[16%]'>
                                    <h1 className='font-semibold'>
                                        <button onClick={() => setOptions(i)} className='hover:scale-105 transition-all duration-3000'>
                                            {items.status === "Order placed" ? (
                                                <div className='text-yellow-500'>{items.status}</div>
                                            ) : items.status === "Canceled" ? (
                                                <div className='text-red-500'>{items.status}</div>
                                            ) : (
                                                <div className='text-green-500'>{items.status}</div>
                                            )}
                                        </button>
                                        {options === i && (
                                            <div className='flex'>
                                                <select name='status' className='bg-gray-800' onChange={change} value={value.status}>
                                                    {["Order placed", "Out for delivery", "Delivered", "Cancelled"].map((status, index) => (
                                                        <option key={index} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                                <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => { setOptions(-1); submitChanges(i); }}>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        )}
                                    </h1>
                                </div>
                                <div className='w-[10%]'>
                                    <button className='text-xl hover:text-orange-500' onClick={() => {
                                        setUserDiv("fixed");
                                        setUserDivData(items.user);
                                    }}>
                                        <IoOpenOutline />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {userDivData && (
                <SeeUserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv} />
            )}
        </>
    );
};

export default All_order;
