import React, { useEffect, useState} from 'react'
import axios from 'axios'
import BookCard from '../Bookcard/BookCard'
import Loader from '../Loader/Loader'

const Recentlyadded = () => {
  const [data,setData] = useState()

     useEffect(()=>{
        const fetch = async () => {
         const res =  await axios.get("http://localhost:5000/v1/book/get-recent-books")
            console.log(res.data.data);
            setData(res.data.data)
           }

            fetch()
          },[])
   
   
  return (
    <div className='mb-8 px-4'>
        <h4 className='text-3xl text-yellow-100'>Recenty added books</h4>
        {!data &&  <div className='flex items-center justify-center my-8'>
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

export default Recentlyadded


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import BookCard from '../Bookcard/BookCard'

// const Recentlyadded = () => {
//   const [data, setData] = useState(null)
//   useEffect(() => {
//     const dbcon = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/v1/book/get-recent-books", {
//           headers: {
//             Authorization: `Bearer YOUR_TOKEN_HERE`
//           }
//         })
//         setData(response.data.data)
//       } catch (error) {
//         console.error('Error fetching recent books:', error)
//       }
//     }
//     dbcon()
//   }, [])
//   return (
//     <div className='mb-8 px-4'>
//       <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
//       <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
//         {
//           data && data.map((items, i) => (
//             <div key={i}><BookCard data={items}></BookCard></div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Recentlyadded
