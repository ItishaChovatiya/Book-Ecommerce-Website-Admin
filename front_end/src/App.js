import React, { useEffect } from 'react';
import Home from './Pages/Home';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Allbook from './Pages/Allbook';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import View_book_detail from './Components/View_book_detail/View_book_detail';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/Auth';
import Favourite from './Components/Profile/Favourite';
import User_order_history from './Components/Profile/User_order_history';
import Setting from './Components/Profile/Setting';
import All_order from './Pages/All_order';
import Add_book from './Pages/Add_book';
import Update_book from './Pages/Update_book';

const App = () => {
  // Dispatch function to interact with Redux store
  const dispatch = useDispatch();
  // Selector to get the user's role from the Redux store
  const role = useSelector((state) => state.auth.role);

  // Effect hook to check for authentication on component mount
  useEffect(() => {
    // Check if user credentials are present in local storage
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      // Dispatch login action and set the user's role
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]); // Dependency array includes dispatch to prevent stale closures

  return (
    <div>
      {/* Navbar component that appears on all pages */}
      <Navbar />
      <Routes>
        {/* Route for the home page */}
        <Route path='/' element={<Home />} />

        {/* Route for viewing all books */}
        <Route path='/all-books' element={<Allbook />} />

        {/* Route for the shopping cart */}
        <Route path='/cart' element={<Cart />} />

        {/* Route for the profile page with nested routes */}
        <Route path='/profile' element={<Profile />}>
          {/* Conditional rendering based on user role */}
          {role === 'user' 
            ? <Route index element={<Favourite />} /> 
            : <Route index element={<All_order />} />}
          {role === "admin" && <Route path='/profile/add-book' element={<Add_book />} />}
          <Route path='/profile/orderHistory' element={<User_order_history />} />
          <Route path='/profile/settings' element={<Setting />} />
        </Route>

        {/* Route for login page */}
        <Route path='/login' element={<Login />} />

        {/* Route for updating a book by ID */}
        <Route path='/update-book/:id' element={<Update_book />} />

        {/* Route for signup page */}
        <Route path='/signup' element={<SignUp />} />

        {/* Route for viewing book details by ID */}
        <Route path='/view-book-details/:id' element={<View_book_detail />} />
      </Routes>
      
      {/* Footer component that appears on all pages */}
      <Footer />
    </div>
  );
};

export default App;
