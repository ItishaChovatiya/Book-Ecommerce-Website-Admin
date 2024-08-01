import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  // State to hold user input values
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  // Hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // Handle input changes
  const change = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submit = async () => {
    try {
      // Validate if all fields are filled
      if (
        value.username === "" ||
        value.email === "" ||
        value.password === "" ||
        value.address === ""
      ) {
        alert("Please fill all the fields");
        return; // Exit if validation fails
      }

      // Make POST request to sign up API
      const response = await axios.post(
        "http://localhost:5000/v1/link/signup",
        value
      );

      // Show success message and navigate to login
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      // Show error message from server
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">Username</label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={value.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="email"
              required
              value={value.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="password"
              required
              value={value.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">Address</label>
            <textarea
              id="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-white font-semibold">Or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="ps-2 hover:text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
