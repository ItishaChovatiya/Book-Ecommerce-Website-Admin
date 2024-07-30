import React,{ useEffect} from 'react'
import Loader from '../Components/Loader/Loader'
import { useState } from 'react'
import BookCard from '../Components/Bookcard/BookCard'

import axios from 'axios'
const Allbook = () => {
  const [data,setData] = useState()

     useEffect(()=>{
        const fetch = async () => {
         const res =  await axios.get("http://localhost:5000/v1/book/get-all-books")
            console.log(res.data.data);
            setData(res.data.data)
           }

            fetch()
          },[])
   
  return (
    <div className='bg-zinc-900 h-auto px-12 py-9 '>
      <h4 className='text-3xl text-yellow-100'>All book</h4>
        {!data &&  <div className='flex items-center justify-center w-full h-screen'>
                      <Loader></Loader>
                  </div>}
        <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                 {
          data && data.map((items, i) => (
          <div key={i}><BookCard data={items} ></BookCard>{" "}</div>
        ))
        }
        
        </div>
    </div>
  )
}

export default Allbook
