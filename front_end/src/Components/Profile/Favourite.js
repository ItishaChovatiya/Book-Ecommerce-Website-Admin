import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../Bookcard/BookCard'


const Favourite = () => {
  const [favBook,setFavBook] = useState([])
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:5000/v1/fav/get-Fav-book",{headers})
      setFavBook(response.data.data)
    }
    fetch()
  },[favBook])

  return (
    <>
      { favBook && favBook.length === 0 && (
          <div className='text-5xl h-[100%] font-semibold text-zinc-500 flex flex-col items-center justify-center w-full'>No Favourites Book
          <img src='asset/img/star.webp' alt='star'className='h-[20vh] my-8'></img></div>
        )}

<div className='grid grid-cols-4 gap-4'>
            {favBook && favBook.map((items,i)=>{
          return(
            <div key={i}>
              <BookCard data={items} favourite ={true}></BookCard>
            </div>
          )
        })}
    </div>
    </>   
  )
}

export default Favourite
