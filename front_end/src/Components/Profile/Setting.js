import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

const Setting = () => {
  const [value,setValue] = useState({address:""})
  const [profile,setProfile] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const change = (e) => {
      const {name,value}  = e.target
      setValue({...value,[name]:value})
  }

  const submit_address = async() => {
        const response = await axios.put("http://localhost:5000/v1/link/update-address",value,{headers})
        alert(response.data.message);
  }
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get("http://localhost:5000/v1/link/get-user-info",{headers})
      console.log(response)
      setProfile(response.data)
      setValue({address:response.data.address})
  }
  fetch()
},[])


  return (
    <div>
      {!profile && <div className='flex justify-center items-center w-full h-[100%]'><Loader></Loader></div>}
      {profile && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor=''>username</label>
              <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profile.username}</p>
              </div>
              <div>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profile.email}</p>
              </div>
          </div>
          <div className='mt-4 flex flex-col'>
          <label htmlFor=''>Address</label>
          <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows='5' placeholder='address' name='address' value={value.address} onChange={change}></textarea>
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 font-semibold text-zinc-900 px-3 py-2 rounded hover;bg-yellow-400' onClick={submit_address}>Update</button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Setting
