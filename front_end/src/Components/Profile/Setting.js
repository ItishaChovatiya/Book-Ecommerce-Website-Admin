import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

/*
 * Setting component: Allows users to view and update their profile settings
 */
const Setting = () => {
  // State to store address input and user profile data
  const [value, setValue] = useState({ address: "" });
  const [profile, setProfile] = useState();

  // Headers for the request, including authentication details
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  // Handle input changes for the address field
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  // Submit the updated address to the server
  const submit_address = async () => {
    try {
      const response = await axios.put("http://localhost:5000/v1/link/update-address", value, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  // Fetch user profile information when the component mounts
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/link/get-user-info", { headers });
        setProfile(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetch();
  }, [headers]);

  return (
    <div>
      {/* Show loader while profile data is being fetched */}
      {!profile && (
        <div className='flex justify-center items-center w-full h-[100%]'>
          <Loader />
        </div>
      )}
      
      {/* Display user profile settings once data is loaded */}
      {profile && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor='username'>Username</label>
              <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profile.username}</p>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profile.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor='address'>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows='5'
              placeholder='address'
              name='address'
              value={value.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-yellow-500 font-semibold text-zinc-900 px-3 py-2 rounded hover:bg-yellow-400'
              onClick={submit_address}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
