import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/*
 * Mobile_nav component: Displays different navigation links based on user role for mobile view
 */
const Mobile_nav = () => {
  // Get user role from Redux store
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {/* Render links for 'user' role */}
      {role === 'user' && (
        <div className='w-full flex items-center justify-between mt-4 lg:hidden'>
          <Link to="/profile" className="text-zinc-100 font-semibold w-full duration-300 text-center hover:bg-zinc-900 rounded transition-all">
            Favourites
          </Link>
          <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold duration-300 w-full text-center hover:bg-zinc-900 rounded transition-all">
            Order History
          </Link>
          <Link to="/profile/settings" className="text-zinc-100 font-semibold w-full duration-300 text-center hover:bg-zinc-900 rounded transition-all">
            Settings
          </Link>
        </div>
      )}

      {/* Render links for 'admin' role */}
      {role === 'admin' && (
        <div className='w-full flex items-center justify-between mt-4 lg:hidden'>
          <Link to="/profile" className="text-zinc-100 font-semibold w-full duration-300 text-center hover:bg-zinc-900 rounded transition-all">
            All Orders
          </Link>
          <Link to="/profile/add-book" className="text-zinc-100 font-semibold duration-300 w-full text-center hover:bg-zinc-900 rounded transition-all">
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};

export default Mobile_nav;
