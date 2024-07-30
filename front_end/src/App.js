import React, { useEffect } from 'react'
import Home from './Pages/Home'
import Navbar from './Components/NavBar/Navbar'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Allbook from './Pages/Allbook'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import View_book_detail from './Components/View_book_detail/View_book_detail'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './Store/Auth'
import Favourite from './Components/Profile/Favourite'
import User_order_history from './Components/Profile/User_order_history'
import Setting from './Components/Profile/Setting'
import All_order from './Pages/All_order'
import Add_book from './Pages/Add_book'
import Update_book from './Pages/Update_book'

const App = () => {

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
  return (
    <div>
      
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/all-books' element={<Allbook></Allbook>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/profile' element={<Profile></Profile>}>
              
              { role === 'user' ? <Route index element={<Favourite></Favourite>}></Route> : <Route index element={<All_order></All_order>}></Route>}
              { role === "admin" &&   <Route path='/profile/add-book' element={<Add_book></Add_book>}></Route>}
              <Route path='/profile/orderHistory' element={<User_order_history></User_order_history>}></Route>
              <Route path='/profile/settings' element={<Setting></Setting>}></Route>
            </Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/update-book/:id' element={<Update_book></Update_book>}></Route>
            <Route path='/signup' element={<SignUp></SignUp>}></Route> 
            <Route path='/view-book-details/:id' element={<View_book_detail></View_book_detail>}></Route>    
        </Routes>
        <Footer></Footer>
        
      
     
      
    </div>
  )
}

export default App
