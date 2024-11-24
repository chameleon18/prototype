
import React, { useState } from "react";
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient'; // Import your Supabase client

const Signup = () => {


    // In your SignUp component

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {


          // Step 1: Sign up user with email and password
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
      
          if (error) {
            console.error("Error signing up:", error.message);
            return;
          }
      
          console.log("Sign-up successful:", data);
      
          // Step 2: Insert additional user data into the 'users' table
          const { error: insertError } = await supabase.from("users").insert([
            {
              username,
              email,
              password, // Add the password field here
            },
          ]);
          
      
          if (insertError) {
            console.error("Error inserting user data:", insertError.message);
          } else {
            console.log("User details inserted successfully");
          }
        } catch (err) {
          console.error("Unexpected error during sign-up:", err);
        }
      };
      

    


  return (
    <div style={{ background: 'linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)' }} className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-40 shadow-md backdrop-blur-md overflow-hidden border-2 border-gray-700 rounded-[5.3%] ">
        <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full mx-auto" />
        <h2 className="text-center text-3xl font-bold text-gray-100">Create an Account</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission from refreshing the page
          handleSignUp(); // Call the handleSignUp function
        }}
        >
      <div>
      <label className="block text-start pl-3 text-xl font-bold text-gray-100">Username</label>
      <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter your username"
      className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
      required
      />
      </div>
      <div>
      <label className="block text-start pl-3 text-xl font-bold text-gray-100">Email</label>
      <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
      required
      />
    </div>
    <div>
      <label className="block text-start pl-3 text-xl font-bold text-gray-100">Password</label>
      <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
      required
      />
    </div>
    <button
    type="submit" // Or "button" if you prefer to manually handle the click
    className="w-full py-2 text-white bg-green-400 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
    >
    Sign Up
    </button>
  </form>

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

export default Signup;
