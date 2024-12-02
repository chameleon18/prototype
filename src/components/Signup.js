import React, { useState } from "react";
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient'; // Import your Supabase client
import { Link } from 'react-router-dom'; 

const Signup = () => {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSignUp = async () => {
      if (!agreeTerms) {
        alert("Please agree to the Terms & Conditions");
        return;
      }
    
      try {
        // Step 1: Sign up user with email and password
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
    
        if (error) {
          if (error.message.includes("User already registered")) {
            alert("User already registered. Please log in.");
          } else {
            alert(`Error signing up: ${error.message}`);
          }
          console.error("Error signing up:", error.message);
          return;
        }
    
        console.log("Sign-up successful:", data);
    
        // Step 2: Insert additional user data into the 'users' table
        const { error: insertError } = await supabase.from("users").insert([
          {
            username,
            email,
            password, 
          },
        ]);
    
        if (insertError) {
          console.error("Error inserting user data:", insertError.message);
          alert(`Error saving user data: ${insertError.message}`);
        } else {
          console.log("User details inserted successfully");
          alert("Account created successfully!");
        }
      } catch (err) {
        console.error("Unexpected error during sign-up:", err);
        alert("Unexpected error occurred. Please try again.");
      }
    };
    
  return (
    <div style={{ background: 'linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)' }} className="min-h-screen">
      <header style={{ background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)" }} className="flex justify-between items-center p-5  to-green-500 text-white">
        <img src={logo} alt="Chameleon Logo" className="h-12" />
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About us</Link>
          <Link to="/contactus" className="hover:underline">Contact us</Link>
        </nav>
      </header>
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 border-2 border-gray-300 rounded-3xl mt-5 mb-5">
        <div className="flex-1 flex items-center justify-center">
        <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full" />
      </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Create an Account</h2>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault(); 
              handleSignUp(); 
            }}
          >
            {/* Username */}
            <div>
              <label className="block text-start text-xl font-bold text-white">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                required
              />
            </div>
            <div className="flex space-x-4">
              {/* First Name */}
              <div className="w-1/2">
                <label className="block text-start text-xl font-bold text-white">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="w-1/2">
                <label className="block text-start text-xl font-bold text-white">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-start text-xl font-bold text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                required
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-start text-xl font-bold text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                required
              />
            </div>
            {/* Terms & Conditions */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              <span className="text-white">
                I agree to the{" "}
                <a href="#" className="text-blue-400 underline">
                  Terms & Conditions
                </a>
              </span>
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-green-600 rounded-3xl hover:bg-green-800 focus:outline-none"
            >
              Create account
            </button>
          </form>
          <div className="text-sm text-center text-white mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 underline">
              Log in
            </Link>
          </div>
          {/* Social Buttons */}
          <div className="flex items-center justify-center mt-6">
            <button className="px-4 py-2 text-white bg-red-600 rounded-full">
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
