import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import BookCard from '../Components/Bookcard/BookCard';
import axios from 'axios';

const Allbook = () => {
  // State to hold the list of books fetched from the API
  const [data, setData] = useState();

  // Effect hook to fetch books data when the component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/v1/book/get-all-books");
        console.log(res.data.data); // Log fetched data for debugging
        setData(res.data.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
      }
    };
    fetch();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {/* Main section with books list */}
      <div className='bg-zinc-900 h-auto px-12 py-9'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        
        {/* Show a loader if data is not yet fetched */}
        {!data && <div className='flex items-center justify-center w-full h-screen'>
          <Loader />
        </div>}
        
        {/* Grid display of book cards if data is available */}
        <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {data && data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
        </div>
      </div>

      {/* Static section with featured books */}
      <section className="container mb-5 mt-5">
        <div className="row">
          {/* Featured book 1 */}
          <div className="col-lg-4 col-md-4 col-sm-12 mb-5">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/718-y5cjyBL._AC_UF1000,1000_QL80_.jpg"
                className="card-img-top mx-auto d-block w-50 h-50"
                alt="Living Spirituality"
              />
              <div className="card-body">
                <h5 className="card-title fs-3 text-center">Living Spirituality</h5>
                <p className="card-text">
                  'Exceptional... Spiritual Anatomy blends the wisdom of yogic philosophy with practical techniques to unlock your infinite potential.' - Deepak Chopra
                </p>
                <button
                  className="rounded-pill mt-3"
                  style={{
                    border: "1px solid #000",
                    padding: "10px 50px",
                  }}
                >
                  Show All
                </button>
              </div>
            </div>
          </div>

          {/* Featured book 2 */}
          <div className="col-lg-4 col-md-4 col-sm-12 mb-5">
            <div className="card">
              <img
                src="https://qph.cf2.quoracdn.net/main-qimg-12b2e472477d602cde9de86bb35c543a-lq"
                className="card-img-top mx-auto d-block w-50 h-50"
                alt="Death"
              />
              <div className="card-body">
                <h5 className="card-title fs-3 text-center">Death</h5>
                <p className="card-text">
                  A transformative guide to building more fulfilling relationships with colleagues, friends, partners, and family, based on the landmark Interpersonal Dynamics “Touchy-Feely”.
                </p>
                <button
                  className="rounded-pill mt-3"
                  style={{
                    border: "1px solid #000",
                    padding: "10px 50px",
                  }}
                >
                  Show All
                </button>
              </div>
            </div>
          </div>

          {/* Featured book 3 */}
          <div className="col-lg-4 col-md-4 col-sm-12 mb-5">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/71kxSlwbgSL._AC_UF894,1000_QL80_.jpg"
                className="card-img-top mx-auto d-block w-50 h-50"
                alt="Self Power"
              />
              <div className="card-body">
                <h5 className="card-title fs-3 text-center">Self Power</h5>
                <p className="card-text">
                  An eye-opening exploration of power and how we can harness it using performance techniques borrowed from actors.
                </p>
                <button
                  className="rounded-pill mt-3"
                  style={{
                    border: "1px solid #000",
                    padding: "10px 50px",
                  }}
                >
                  Show All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Allbook;
