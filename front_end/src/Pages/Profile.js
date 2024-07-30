import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader/Loader'
import Mobile_nav from '../Components/Profile/Mobile_nav'

const Profile = () => {
  // const isLoggedIn = useSelector()
  const [profile,setProfile] = useState()
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=> {
      const fetch = async() => {
        const response = await axios.get("http://localhost:5000/v1/link/get-user-info",{headers})
        setProfile(response.data);
      }
      fetch()
  },[])
  return (
    <div className='bg-zinc-900 gap-8 px-2 py-8 md:px-12 flex flex-col md:flex-row text-white'>
      {!profile && <div className='w-full h-[100%] flex items-center justify-center'> <Loader></Loader> </div>}
      {
        profile && (
          <>
             <div className='w-full md:w-1/6 lg:h-screen  h-auto'>
                <Sidebar data = {profile}></Sidebar>
                <Mobile_nav></Mobile_nav>
            </div>
            <div className='w-full md:w-5/6'>
                <Outlet></Outlet>
            </div>
       </>
        )
      }
    </div>
  )
}

export default Profile
