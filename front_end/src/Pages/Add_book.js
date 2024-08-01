import axios from 'axios';
import React, { useState } from 'react';

const Add_book = () => {
    // State to manage the form data
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        description: '',
        language: ''
    });

    // Headers for authorization
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    // Handle input changes
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    // Handle form submission
    const submit = async () => {
        try {
            // Check if any field is empty
            if (Object.values(Data).some(field => field === "")) {
                alert("Please fill all the fields");
            } else {
                // Send POST request to add the book
                const res = await axios.post("http://localhost:5000/v1/book/add-book", Data, { headers });
                // Clear form data on successful addition
                setData({
                    url: '',
                    title: '',
                    author: '',
                    price: '',
                    description: '',
                    language: ''
                });
                alert(res.data.message);
            }
        } catch (error) {
            // Handle errors (note: corrected `error.res` to `error.response`)
            alert(error.response?.data.message || 'An error occurred');
        }
    };

    return (
        <div className='h-[100%] md:p-4 p-0'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add Book</h1>
            <div className='p-4 bg-zinc-800'>
                {/* Image URL input */}
                <div>
                    <label className='text-zinc-400' htmlFor='url'>Image</label>
                    <input
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='URL of image'
                        type="text"
                        name="url"
                        required
                        value={Data.url}
                        onChange={change}
                    />
                </div>

                {/* Title input */}
                <div className='mt-4'>
                    <label className='text-zinc-400' htmlFor='title'>Title Of Book</label>
                    <input
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        type='text'
                        placeholder='title of book'
                        name='title'
                        required
                        value={Data.title}
                        onChange={change}
                    />
                </div>

                {/* Author input */}
                <div className='mt-4'>
                    <label className='text-zinc-400' htmlFor='author'>Author Of Book</label>
                    <input
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        type='text'
                        placeholder='author of book'
                        name='author'
                        required
                        value={Data.author}
                        onChange={change}
                    />
                </div>

                {/* Language and Price inputs */}
                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label className='text-zinc-400' htmlFor='language'>Language</label>
                        <input
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            type='text'
                            placeholder='language of book'
                            name='language'
                            required
                            value={Data.language}
                            onChange={change}
                        />
                    </div>
                    <div className='w-3/6'>
                        <label className='text-zinc-400' htmlFor='price'>Price</label>
                        <input
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            type='number'
                            placeholder='price of book'
                            name='price'
                            required
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>

                {/* Description input */}
                <div className='mt-4'>
                    <label className='text-zinc-400' htmlFor='description'>Description Of Book</label>
                    <textarea
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        rows="5"
                        placeholder='description of book'
                        name='description'
                        required
                        value={Data.description}
                        onChange={change}
                    />
                </div>

                {/* Submit button */}
                <button
                    className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
                    onClick={submit}
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default Add_book;
