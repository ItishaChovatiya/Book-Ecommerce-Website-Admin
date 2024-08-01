import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Components/Loader/Loader'
import Mobile_nav from '../Components/Profile/Mobile_nav'

const Profile = () => {
  // State to hold the profile data
  const [profile, setProfile] = useState();

  // Headers including user id and authorization token for the API request
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  // Fetch user profile information on component mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/link/get-user-info", { headers });
        setProfile(response.data); // Set the profile data from the response
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }
    fetch();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className='bg-zinc-900 gap-8 px-2 py-8 md:px-12 flex flex-col md:flex-row text-white'>
      {/* Loader shown while the profile data is being fetched */}
      {!profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      
      {/* Render profile data if available */}
      {profile && (
        <>
          {/* Sidebar and mobile navigation */}
          <div className='w-full md:w-1/6 lg:h-screen h-auto'>
            <Sidebar data={profile} />
            <Mobile_nav />
          </div>
          
          {/* Outlet for rendering nested routes/components */}
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
