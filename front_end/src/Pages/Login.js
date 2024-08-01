import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authActions } from '../Store/Auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  // State to hold input values for username and password
  const [value, setValue] = useState({ username: "", password: "" });

  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle changes in input fields
  const change = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  // Function to handle form submission
  const submit = async () => {
    try {
      // Check if both fields are filled
      if (value.username === "" || value.password === "") {
        alert("Please fill all the fields");
      } else {
        // Send a POST request to the login API
        const response = await axios.post("http://localhost:5000/v1/link/sign-in", value);
        
        // Dispatch actions to update authentication state and user role
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        
        // Store user credentials and role in localStorage
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        // Navigate to the profile page
        navigate("/profile");
      }
    } catch (error) {
      // Display error message if login fails
      alert(error.response.data.message);
    }
  }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      {/* Container for the login form */}
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>
          Login
        </p>
        
        {/* Form fields for username and password */}
        <div className='mt-4'>
          <div>
            <label htmlFor='username' className='text-zinc-400'>Username</label>
            <input 
              type='text' 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              placeholder='username' 
              name='username' 
              required 
              value={value.username} 
              onChange={change}
            />
          </div>
          
          <div className='mt-4'>
            <label htmlFor='password' className='text-zinc-400'>Password</label>
            <input 
              type='password' 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
              name='password' 
              required 
              value={value.password} 
              onChange={change}
            />
          </div>
          
          <div className='mt-4'>
            <button 
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600'
              onClick={submit}
            >
              Login
            </button>
          </div>
          
          {/* Link to sign up page */}
          <p className='flex mt-4 items-center justify-center text-white font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Don't have an account?  
            <Link to="/signup" className='ps-2 hover:text-blue-500'>SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
