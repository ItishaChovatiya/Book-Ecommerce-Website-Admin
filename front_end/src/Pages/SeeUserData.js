import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <>
      {/* Overlay background to dim the content behind the modal */}
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
      
      {/* Modal container */}
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className='bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800'>
          
          {/* Modal header with close button */}
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>User Information</h1>
            
            {/* Close button */}
            <button onClick={() => setUserDiv("hidden")} className=''>
              <RxCross1 />
            </button>
          </div>
          
          {/* User information */}
          <div className='mt-2'>
            <label htmlFor=''>User Name : <span className='font-semibold'>{userDivData.username}</span></label>
          </div>
          <div className='mt-4'>
            <label htmlFor=''>Email : <span className='font-semibold'>{userDivData.email}</span></label>
          </div>
          <div className='mt-4'>
            <label htmlFor=''>Address : <span className='font-semibold'>{userDivData.address}</span></label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeUserData
