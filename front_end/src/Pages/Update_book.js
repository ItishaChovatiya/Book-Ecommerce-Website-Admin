import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update_book = () => {
    
    const {id} = useParams()
    const navigate= useNavigate()

    const [Data,setData] = useState({
        url : '',
        title : '',
        author : '',
        price : '',
        description : '',
        language : ''
    })

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid : id
      };

      const change = (e) => {
        const {name,value} = e.target
        setData({...Data,[name]:value})
      }

      const submit = async() => {
        try {
            if(Data.url === "" || Data.title === "" || Data.author === "" || Data.price === "" || Data.description === "" || Data.language ===  ""){alert("Please fill all the fields") }
            else{
                const res = await axios.put("http://localhost:5000/v1/book/update-book",Data,{headers})
                setData({
                    url : '',
                    title : '',
                    author : '',
                    price : '',
                    description : '',
                    language : ''
                })
                alert(res.data.message)
                navigate(`/view-book-details/${id}`)
            }
        } catch (error) {
            alert(error.res.data.message)
           
        }
    }

    useEffect(()=>{
        const fetch = async () => {
         const res =  await axios.get(`http://localhost:5000/v1/book/get-book-by-id/${id}`)
            // console.log(res.data.data);
            setData(res.data.data)
           }

            fetch()
          },[])
      return (
        <div className='bg-zinc-900 h-[100%] md:p-4 p-0'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
        <div className='p-4 bg-zinc-800'>
            <div>
                <label className='text-zinc-400' htmlFor=''>Image</label>
                <input className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='URL of image' type="text" name="url" required value={Data.url} onChange={change}></input>
            </div>
            <div className='mt-4'>
                <label className='text-zinc-400' htmlFor=''>Title Of Book</label>
                <input className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' type='text' placeholder='title of book' name='title'
                required value={Data.title} onChange={change}></input>
            </div>
            <div className='mt-4'>
                <label className='text-zinc-400' htmlFor=''>Author Of Book</label>
                <input className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' type='text' placeholder='author of book' name='author'
                required value={Data.author} onChange={change}></input>
            </div>
            <div className='mt-4 flex gap-4'>
                <div className='w-3/6'>
                    <label className='text-zinc-400' htmlFor=''>Language</label>
                    <input className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' type='text' placeholder='language of book' name='language' required value={Data.language} onChange={change}></input>
                </div>
                <div className='w-3/6'>
                    <label className='text-zinc-400' htmlFor=''>Price</label>
                    <input className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' type='number' placeholder='price of book' name='price' required value={Data.price} onChange={change}></input>
                </div>
            </div>
            <div className='mt-4'>
                <label className='text-zinc-400' htmlFor=''>Description Of Book</label>
                <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' rows="5" placeholder='description of book' name='description'  required value={Data.description} onChange={change}></textarea>
            </div>
            <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>Update Book</button>
        </div>
      
    </div>
  )
}

export default Update_book
