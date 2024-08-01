import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";

// BookCard component: displays book details and allows removing from favourites if 'favourite' is true
const BookCard = ({ data, favourite }) => {
  // Setting headers for the axios request, using localStorage for id and token
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };

  // Function to handle removing the book from favourites
  const handle_removebook = async () => {
    try {
      // Sending a PUT request to delete the favourite book
      const response = await axios.put("http://localhost:5000/v1/fav/delete-Fav-book", {}, { headers });
      alert(response.data.message); // Alerting the user about the response message
    } catch (error) {
      console.error("Error removing book from favourites", error); // Logging the error to the console
      alert("Failed to remove the book from favourites."); // Alerting the user about the failure
    }
  };

  return (
    <div className='bg-zinc-800 rounded flex-col flex p-4'>
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} className='h-[25vh]' alt='card-img' />
          </div>
          <h2 className='mt-4 text-xl font-semibold text-white'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>By : {data.author}</p>
          <p className='mt-2 text-zinc-400 font-semibold text-xl'>Price : ${data.price}</p>
        </div>
      </Link>
      {
        favourite && (
          <button
            className='bg-yellow-50 px-4 rounded border border-yellow-500 text-yellow-500 py-2 mt-4'
            onClick={handle_removebook}
          >
            Remove from Favourites
          </button>
        )
      }
    </div>
  );
};

export default BookCard;
