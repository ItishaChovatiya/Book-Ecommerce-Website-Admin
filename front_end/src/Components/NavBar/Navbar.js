import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';


const Navbar = () => {
    const links = [
        {
            title:"Home",
            link:"/"
        },
        {
            title:"All Books",
            link:"/all-books"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin Profile",
            link:"/profile"
        }
    ]

   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
//    console.log(isLoggedIn);

    const role = useSelector((state) => state.auth.role)
    if(isLoggedIn === false){
        links.splice(2,2)
    }
    if( isLoggedIn === true && role === "user"){
        links.splice(4,1)   
    }
    if( isLoggedIn === true && role === "admin"){
        links.splice(3,1)   
    }

    const [mobileNav, setMobileNav] = useState("hidden")
  return (
    <>
        <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
      <Link to="/" className='flex items-center'>
      <img src='asset/img/book.png' alt='logo' className='h-14 me-4'></img>
        <h1 className='text-2xl font-semibold'>BooksHeaven</h1>
    </Link>
      <div className='nav-links-bookheaven block md:flex items-center gap-4'>
        <div className='hidden md:flex gap-4'>
            {
            links.map((items,i) => (
                <div className='flex items-cenetr' key={i}>
                    {
                        items.title === "Profile" || items.title === "Admin Profile" ?  (
                            <Link to={items.link} className='hover:text-blue-500 hover:bg-white border border-blue-900 p-2 transition-all duration-300' key={i}>{items.title}</Link>
                        ): (
                            <Link to={items.link} className='hover:text-blue-500 transition-all duration-300' key={i}>{items.title}{" "}</Link>
                        )
                    }
                </div>
               ))
            }
            
        </div>
        {/* <div className='hidden md:flex gap-4'>
            <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
            <Link to="/signUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
        </div>  */}
        {
            isLoggedIn === false  && (
                <div className='hidden md:flex gap-4'>
                <Link to="/login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
                <Link to="/signUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
            </div>
            )
        }
        <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
            <FaGripLines />
        </button>
      </div>
    </nav>
    <div className={`${mobileNav} text-white text-4xl font-semibold bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {
            links.map((items,i) => (
                <Link to={items.link} className={`${mobileNav}hover:text-blue-500 mb-8 transition-all duration-300`} key={i} onClick={()=>mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>{items.title}{" "}</Link>
            ))}
            <Link to="/login" className={`${mobileNav} mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300`}>LogIn</Link>
            <Link to="/signUp" className={`${mobileNav} mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
            
    </div>
    </>
    
  )
}

export default Navbar