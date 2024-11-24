
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
      <div className="w-full max-w-4xl p-8 space-y-6 bg-blue-100 border-2 border-blue-300 rounded-3xl mt-5 mb-5">
  <div className="flex space-x-8">
    {/* Left Column */}
    <div className="flex-1 flex items-center justify-center">
      <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full" />
    </div>
    {/* Right Column */}
    <div className="text-center text-3xl font-bold text-black mb-4">
      <h2 className="text-center text-3xl font-bold text-black mb-4">Create an Account</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission from refreshing the page
          handleSignUp(); // Call the handleSignUp function
        }}
      >
        <div className="flex space-x-4">
          {/* Username Field */}
          <div className="w-1/2">
            <label className="block text-start pl-3 text-xl font-bold text-black">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-6 py-4 mt-1 border rounded-3xl bg-grey-200 text-lg"
              required
            />
          </div>
          {/* Email Field */}
          <div className="w-1/2">
            <label className="block text-start pl-3 text-xl font-bold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 mt-1 border rounded-3xl bg-grey-200 text-lg"
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          {/* Password Field */}
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-6 py-4 mt-1 border rounded-3xl bg-grey-200 text-lg"
              required
            />
          </div>
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2.5 text-lg font-bold text-white bg-green-400 rounded-3xl hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Sign Up
          </button>
        </div>
      </form>
      {/* Login Link */}
      <div className="text-sm text-center text-black mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-800 hover:underline">
          Log in
        </a>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Signup;
