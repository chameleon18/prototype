import React from "react";
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient'; // Import your Supabase client

const Signpage = () => {


    // In your SignUp component

    const handleSignUp = async (username, email, password) => {
    const { user, error } = await supabase.auth.signUp
    .from('users')
    .insert({
        username:username,
        email: email,
        password: password
    });

        if (error) {
            console.error(error.message);
        } else {
            console.log('Sign-up successful', user);
        }
    };


  return (
    <div style={{ background: 'linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)' }} className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-40 shadow-md backdrop-blur-md overflow-hidden border-2 border-gray-700 rounded-[5.3%] ">
        <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full mx-auto" />
        <h2 className="text-center text-3xl font-bold text-gray-100">Create an Account</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <button
            type="submit" onClick={handleSignUp}
            className="w-full py-2 text-white bg-green-400 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Sign Up
          </button>
        </form>
        {/* Google Sign Up Button */}
        <button
          type="button"
          className="w-full py-2 text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-400 mt-4"
        >
          Sign Up with Google
        </button>
        <div className="text-sm text-center text-gray-100">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-800 hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signpage;
