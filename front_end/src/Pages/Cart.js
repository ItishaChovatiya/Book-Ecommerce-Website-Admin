// // import React, { useEffect, useState } from 'react'
// // import Loader from '../Components/Loader/Loader'
// // import { AiFillDelete } from "react-icons/ai";
// // import axios from 'axios';

// // const Cart = ({data,bookid}) => {
// //   const [cart,setCart] = useState(null)
// //   const [total,setTotal] = useState(0)
// //   const headers = {
// //     id : localStorage.getItem("id"),
// //     authorization : `Bearer ${localStorage.getItem("token")}`
  
// //   }
 
// //   useEffect(()=>{
// //     const fetch = async ()=>{
// //       const response = await axios.get("http://localhost:5000/v1/cart/get-user-cart",{headers})
// //       setCart(response.data.data)
// //     }
// //     fetch()
// //   },[])
  
// //   const deleteItem = async (bookid) => {
// //     try {
// //       const response = await axios.put(`http://localhost:5000/v1/cart/remove-book/${bookid}`, {}, { headers });
// //       alert(response.data.message);

// //       // Update the cart after deleting the item
// //       setCart(prevCart => prevCart.filter(item => item._id !== bookid));
// //     } catch (error) {
// //       console.error('Failed to delete item', error);
// //     }
// //   };
// //   return (
// //     <div className='bg-zinc-900 px-12 h-screen py-8'>
// //       {
// //         !cart && <Loader></Loader>
// //       }
// //       {
// //         cart && cart.length === 0  && (
// //           <div className='h-screen'>
// //             <div className='h-[100%] flex items-center justify-center flex-col'>
// //               <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
// //                 Empty Cart
// //               </h1>
// //               <img src='asset/img/empty_cart.png' alt='empty' className='lg:h-[50vh]'></img>
// //             </div>
// //           </div>
// //         )
// //       }
// //       {
// //         cart && cart.length >=  1 && (
// //           <>
// //             <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
// //             {
// //               cart?.map((items,i) => (
// //                 <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
// //                   <img src={items.url} alt='img' className='h-[20vh] md:h-[10vh] object-cover'></img>
// //                   <div className='w-full md:w-auto'>
// //                       <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title} </h1>
// //                       <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.description.slice(0,100)}...</p>
// //                       <p className='text-normal text-zinc-300 mt-2 hidden lg:hidden md:block'>{items.description.slice(0,65)}...</p>
// //                       <p className='text-normal text-zinc-300 mt-2 md:hidden block'>{items.description.slice(0,100)}...</p>
// //                   </div>
// //                   <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
// //                     <h2 className='text-zinc-100 text-3xl font-semibold flex'>${items.price}</h2>
// //                     <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={()=>deleteItem(items._id)}><AiFillDelete /></button>
// //                   </div>
// //                 </div>
// //               ))
// //             }
// //           </>

// //         )
// //       }
// //     </div>
// //   )
// // }

// // export default Cart



import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const Cart = () => {
  const [favBook,setFavBook] = useState([])
  const navigate = useNavigate()
  const [cart, setCart] = useState();
  const [total,setTotal] = useState(0)



  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
    
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/cart/get-user-cart", { headers });
      setCart(response.data.data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const deleteItem = async (bookid) => {
 
        try {
          const response = await axios.put(`http://localhost:5000/v1/cart/remove-book/${bookid}`, {}, { headers });
          console.log(response.data.message)
    
          // // Update the cart after deleting the item
          setCart(prevCart => prevCart.filter(item => item._id !== bookid));
        } catch (error) {
          console.error('Failed to delete item', error);
        }
      };

useEffect(()=>{
  if(cart && cart.length > 0 ){
    let totals = 0
    cart.map((items)=>{
        totals += items.price
    })
    setTotal(totals)
    totals = 0
  }
},[cart])

const place_Order = async() =>{
  try {
    const response = await axios.post("http://localhost:5000/v1/order/placeOrder",{order:cart},{headers})
    console.log(response.data.message)
    navigate("/profile/orderHistory")
  } catch (error) {
      console.log(error);
  }
}
return (
  <div className='bg-zinc-900 px-12 h-screen py-8'>
    {
      !cart && (
        <div className='w-full h-[100%] flex items-center justify-center'><Loader></Loader></div>
      )
    }
    {
      cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src='asset/img/empty_cart.png' alt='empty' className='lg:h-[50vh]'></img>
          </div>
        </div>
      )
    }
    {
      cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          {
            cart.map((items,i) => (
              <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
                <img src={items.url} alt='img' className='h-[20vh] md:h-[10vh] object-cover'></img>
                <div className='w-full md:w-auto'>
                    <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title} </h1>
                    <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.description.slice(0,100)}...</p>
                    <p className='text-normal text-zinc-300 mt-2 hidden lg:hidden md:block'>{items.description.slice(0,65)}...</p>
                    <p className='text-normal text-zinc-300 mt-2 md:hidden block'>{items.description.slice(0,100)}...</p>
                </div>
                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <h2 className='text-zinc-100 text-3xl font-semibold flex'>${items.price}</h2>
                  <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={()=>deleteItem(items._id)}><AiFillDelete /></button>
                </div>
              </div>
            ))
          }
        </>

      )
    }

    {
      cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{cart.length} books</h2><h2>${total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-zinc-100 rounded px-4 py-2 justify-center w-full font-semibold hover:bg-zinc-200' onClick={place_Order}>Place your Order</button>
            </div>
          </div>
        </div>
      )
    }
  </div>
)
}

export default Cart






