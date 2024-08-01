import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaEdit, FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';

function View_book_detail() {
    const { id } = useParams(); // Extract book ID from URL parameters
    const navigate = useNavigate(); // Hook for navigation
    const [data, setData] = useState(); // State to store book details
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check if the user is logged in
    const role = useSelector((state) => state.auth.role); // Get user role from the Redux store

    // Fetch book details from API when component mounts
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`http://localhost:5000/v1/book/get-book-by-id/${id}`);
            setData(res.data.data);
        };
        fetch();
    }, [id]);

    // Define headers for API requests including book ID and authorization tokens
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };

    // Handle adding book to favourites
    const handlefavourites = async () => {
        const response = await axios.put("http://localhost:5000/v1/fav/getFav", {}, { headers });
        alert(response.data.message);
    };

    // Handle adding book to cart
    const handle_Cart = async () => {
        const response = await axios.put("http://localhost:5000/v1/cart/add-book", {}, { headers });
        alert(response.data.message);
    };

    // Handle deleting the book
    const deletebook = async () => {
        const response = await axios.delete("http://localhost:5000/v1/book/delete-book", { headers });
        alert(response.data.message);
        navigate("/all-books");
    };

    return (
        <>
            {/* Show loading indicator if book data is not yet loaded */}
            {!data ? (
                <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex lg:flex-row flex-col gap-8 items-start'>
                    {/* Book image and actions */}
                    <div className='w-full lg:w-3/6'>
                        <div className='flex justify-around bg-zinc-800 p-12 rounded lg:flex-row flex-col'>
                            <img src={data.url} className='md:w-70 lg:w-[75%] rounded' alt='view_img' />

                            {/* Conditional actions based on user login status and role */}
                            {isLoggedIn && role === "user" && (
                                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:jsutify-start mt-8 lg:mt-0'>
                                    <button
                                        className='bg-white rounded lg:rounded-full text-2xl p-3 md:p-1 ms-4 text-red-500 flex'
                                        onClick={handlefavourites}
                                    >
                                        <FaHeart className='mt-1 p-0' />
                                        <span className='ms-2 lg:hidden block'>Favourites</span>
                                    </button>
                                    <button
                                        className='bg-white rounded lg:rounded-full rounded text-2xl lg:text-3xl flex mx-3 lg:p-3 md:p-2 text-blue-600 md:mt-0 mt-8'
                                        onClick={handle_Cart}
                                    >
                                        <FaShoppingCart className='mt-1 m-1' />
                                        <span className='ms-2 lg:hidden block pe-2'>Add to cart</span>
                                    </button>
                                </div>
                            )}

                            {isLoggedIn && role === "admin" && (
                                <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:jsutify-start mt-8 lg:mt-0'>
                                    <Link
                                        to={`/update-book/${id}`}
                                        className='bg-white rounded lg:rounded-full rounded text-2xl lg:text-3xl mt-0 flex mx-3 lg:p-3 md:p-2 text-red-600 md:mt-0 mt-8 px-4'
                                    >
                                        <FaEdit />
                                        <span className='ms-2 block'>Edit</span>
                                    </Link>
                                    <button
                                        className='bg-white rounded lg:rounded-full rounded text-2xl lg:text-3xl flex mx-3 lg:p-3 md:p-2 text-red-600 my-10'
                                        onClick={deletebook}
                                    >
                                        <MdDeleteOutline className='mt-1 m-1' />
                                        <span className='ms-2 block pe-2'>Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Book details */}
                    <div className='p-4 w-full lg:w-3/6'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
                        <p className='text-zinc-400 mt-1'>By: {data.author}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{data.description}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className='me-3' />
                            {data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price: {data.price}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default View_book_detail;
