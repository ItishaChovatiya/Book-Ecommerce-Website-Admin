import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update_book = () => {
  // Extract book ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold book data
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    description: '',
    language: ''
  });

  // Headers for authentication and book ID
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };

  // Function to handle form input changes
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // Function to handle form submission
  const submit = async () => {
    try {
      // Check if all fields are filled
      if (Object.values(Data).some(field => field === '')) {
        alert("Please fill all the fields");
        return;
      }

      // Send PUT request to update book information
      const res = await axios.put("http://localhost:5000/v1/book/update-book", Data, { headers });

      // Clear form fields after successful update
      setData({
        url: '',
        title: '',
        author: '',
        price: '',
        description: '',
        language: ''
      });

      // Show success message and navigate to book details page
      alert(res.data.message);
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      // Handle and show error message
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Fetch book data when component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        // Send GET request to fetch book details by ID
        const res = await axios.get(`http://localhost:5000/v1/book/get-book-by-id/${id}`);
        // Set fetched data to state
        setData(res.data.data);
      } catch (error) {
        // Handle errors during data fetch
        alert("Failed to fetch book data");
      }
    };

    fetch();
  }, [id]);

  return (
    <div className='bg-zinc-900 h-full md:p-4 p-0'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
      <div className='p-4 bg-zinc-800'>
        <div>
          <label className='text-zinc-400' htmlFor='url'>Image URL</label>
          <input
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='URL of image'
            type='text'
            name='url'
            id='url'
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label className='text-zinc-400' htmlFor='title'>Title Of Book</label>
          <input
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            type='text'
            placeholder='Title of book'
            name='title'
            id='title'
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label className='text-zinc-400' htmlFor='author'>Author Of Book</label>
          <input
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            type='text'
            placeholder='Author of book'
            name='author'
            id='author'
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className='mt-4 flex gap-4'>
          <div className='w-3/6'>
            <label className='text-zinc-400' htmlFor='language'>Language</label>
            <input
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              type='text'
              placeholder='Language of book'
              name='language'
              id='language'
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
              placeholder='Price of book'
              name='price'
              id='price'
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className='mt-4'>
          <label className='text-zinc-400' htmlFor='description'>Description Of Book</label>
          <textarea
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            rows='5'
            placeholder='Description of book'
            name='description'
            id='description'
            required
            value={Data.description}
            onChange={change}
          />
        </div>
        <button
          className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default Update_book;
