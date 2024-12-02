import React, { useState } from "react";
import logo from "../assets/logo.png";
import { supabase } from "../supabaseClient"; // Import your Supabase client
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // State to hold email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login function
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed: " + error.message); // Display error message to user
        return;
      }

      console.log("Login successful:", data);
      alert("Login successful! Welcome!");
      // Redirect or perform other actions upon successful login
      navigate("/");
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)" }} className="min-h-screen">
      {/* Custom Header for About Us Page */}
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
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center">
            <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full" />
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Log In</h2>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission from refreshing the page
              handleLogin(); // Call the handleLogin function
            }}
          >
            {/* Email */}
            <div>
              <label className="block text-start text-xl font-bold text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                placeholder="Enter your email"
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
                onChange={(e) => setPassword(e.target.value)} // Update password state
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded bg-gray-800 text-white"
                required
              />
            </div>
            {/* Log In Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-green-600 rounded-3xl hover:bg-green-800 focus:outline-none"
            >
              Log In
            </button>
          </form>
          <div className="text-sm text-center text-white mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 underline">
              Sign Up
            </Link>
          </div>
          {/* Social Buttons */}
          <div className="flex items-center justify-center mt-6">
            <button className="px-4 py-2 text-white bg-red-600 rounded-full">
              <i className="fab fa-google"></i> Log In with Google
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
