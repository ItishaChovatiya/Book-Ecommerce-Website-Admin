import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

/*
 * Navbar component: Displays the navigation bar with links based on user's login status and role
 */
const Navbar = () => {
  // Array of link objects for the navigation bar
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" }
  ];

  // Get login status and role from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Adjust links array based on login status and role
  if (!isLoggedIn) {
    links.splice(2, 2); // Remove 'Cart' and 'Profile' links
  } else if (role === "user") {
    links.splice(4, 1); // Remove 'Admin Profile' link for users
  } else if (role === "admin") {
    links.splice(3, 1); // Remove 'Profile' link for admins
  }

  // State to manage mobile navigation visibility
  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <Link to="/" className='flex items-center'>
          <img src='asset/img/book.png' alt='logo' className='h-14 me-4' />
          <h1 className='text-2xl '>BooksHeaven</h1>
        </Link>
        <div className='nav-links-bookheaven block md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((item, i) => (
              <div className='flex items-center' key={i}>
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link to={item.link} className='hover:text-blue-500 hover:bg-white border border-blue-900 p-2 transition-all duration-300'>{item.title}</Link>
                ) : (
                  <Link to={item.link} className='hover:text-blue-500 transition-all duration-300'>{item.title}</Link>
                )}
              </div>
            ))}
          </div>
          {/* Conditional rendering for login and sign-up links */}
          { !isLoggedIn && (
            <div className='hidden md:flex gap-4'>
              <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
              <Link to="/signUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
            </div>
          )}
          <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={`${mobileNav} text-white text-4xl font-semibold bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((item, i) => (
          <Link to={item.link} className='hover:text-blue-500 mb-8 transition-all duration-300' key={i} onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}>{item.title}</Link>
        ))}
        <Link to="/login" className='mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300'>LogIn</Link>
        <Link to="/signUp" className='mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
      </div>
    </>
  );
};

export default Navbar;
