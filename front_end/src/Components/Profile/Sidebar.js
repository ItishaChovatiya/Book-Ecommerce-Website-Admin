import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/Auth';

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className='bg-zinc-800 lg:h-[100%] h-auto flex flex-col items-center justify-between p-4 rounded'>
      <div className='flex items-center flex-col justify-center'>
        <img className='h-[12vh]' src={data.user_avtar} alt='img' />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      
      {/* Conditional rendering for user role */}
      {role === "user" && (
        <div className='w-full flex-col items-center hidden justify-center lg:flex'>
          <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 duration-300 text-center hover:bg-zinc-900 rounded transition-all">Favourites</Link>
          <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold duration-300 w-full py-2 text-center hover:bg-zinc-900 rounded transition-all">Order History</Link>
          <Link to="/profile/settings" className="text-zinc-100 font-semibold w-full duration-300 py-2 text-center hover:bg-zinc-900 rounded transition-all">Settings</Link>
        </div>
      )}

      {/* Conditional rendering for admin role */}
      {role === "admin" && (
        <div className='w-full flex-col items-center hidden justify-center my-14 py-10 lg:flex'>
          <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 duration-300 text-center hover:bg-zinc-900 rounded transition-all">All Orders</Link>
          <Link to="/profile/add-book" className="text-zinc-100 font-semibold duration-300 w-full py-2 text-center hover:bg-zinc-900 rounded transition-all">Add Book</Link>
        </div>
      )}

      {/* Logout button */}
      <button
        className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 mt-5 text-white font-semibold flex items-center justify-center py-2 rounded transition-all duration-300'
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear(); // Clear all localStorage items
          navigate("/"); // Redirect to home page
        }}
      >
        Log out<FaArrowRightFromBracket className='ms-2' />
      </button>
    </div>
  );
}

export default Sidebar;
