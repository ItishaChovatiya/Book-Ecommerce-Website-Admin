import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Bookcard/BookCard';
import Loader from '../Loader/Loader';

/*
 * Recentlyadded component: Fetches and displays recently added books
 */
const Recentlyadded = () => {
  // State to hold the data of recently added books
  const [data, setData] = useState(null);

  /*
   * useEffect hook to fetch data when the component mounts
   * The fetchRecentBooks function fetches data from the API and updates the state
   */
  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        // Sending a GET request to fetch recently added books
        const res = await axios.get("http://localhost:5000/v1/book/get-recent-books");
        console.log(res.data.data); // Logging the response data for debugging
        setData(res.data.data); // Updating the state with the fetched data
      } catch (error) {
        console.error("Error fetching recent books", error); // Logging any errors that occur
      }
    };

    // Calling the fetch function
    fetchRecentBooks();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className='mb-8 px-4'>
      {/* Header for the recently added books section */}
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
      
      {/* Conditional rendering: show loader if data is not yet available */}
      {!data ? (
        <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>
      ) : (
        <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {/* Mapping over the data to display each book using the BookCard component */}
          {data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recentlyadded;
