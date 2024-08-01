import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../Bookcard/BookCard';

/*
 * Favourite component: Displays a list of favorite books for the user
 */
const Favourite = () => {
  // State to store favorite books
  const [favBook, setFavBook] = useState([]);

  // Headers for the request, including authentication details
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  // Fetch favorite books from the API
  useEffect(() => {
    const fetch = async () => {
      try {
        // Fetch the list of favorite books
        const response = await axios.get("http://localhost:5000/v1/fav/get-Fav-book", { headers });
        // Update the state with the fetched data
        setFavBook(response.data.data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };
    fetch();
  }, [headers]); // Dependency array includes headers to refetch if they change

  return (
    <>
      {/* Display a message and image if no favorite books are found */}
      {favBook && favBook.length === 0 && (
        <div className='text-5xl h-[100%] font-semibold text-zinc-500 flex flex-col items-center justify-center w-full'>
          No Favourite Book
          <img src='asset/img/star.webp' alt='star' className='h-[20vh] my-8' />
        </div>
      )}

      {/* Grid to display favorite books */}
      <div className='grid grid-cols-4 gap-4'>
        {favBook && favBook.map((items, i) => (
          <div key={i}>
            {/* Render a BookCard for each favorite book */}
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourite;
