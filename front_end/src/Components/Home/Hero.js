import React from 'react';
import { Link } from 'react-router-dom';

// Hero component: displays a promotional message with a call-to-action and an image
const Hero = () => {
  return (
    <div className='md:h-[75vh] flex flex-col md:flex-row items-center justify-center'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl mb-12 md:mb-0 lg:text-5xl font-semibold text-yellow-100 text-center lg:text-left'>
          Discover your next Great read
        </h1>
        <p className='mt-4 text-xl text-zinc-300 lg:text-left'>
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
        </p>
        <div className='mt-8'>
          <Link 
            to='/all-books' 
            className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
            Discover Books
          </Link>
        </div>
      </div>
      <div className='h-auto pt-8 ms-20 max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter'>
        <img src='asset/img/bookshop.avif' alt='Bookshop' className='img-fluid' />
      </div>
    </div>
  );
}

export default Hero;
