import React, { useState } from "react";
import logo from "../assets/logo.png";
import { supabase } from "../supabaseClient"; // Import your Supabase client
import { useNavigate } from "react-router-dom";

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
    <div
      style={{ background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)" }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-40 shadow-md backdrop-blur-md overflow-hidden border-2 border-gray-700 rounded-[5.3%]">
        <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full mx-auto" />
        <h2 className="text-center text-3xl font-bold text-gray-100">Log In</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission from refreshing the page
            handleLogin(); // Call the handleLogin function
          }}
        >
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-start pl-3 text-xl font-bold text-gray-100">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-400 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Log In
          </button>
        </form>
        {/* Google Login Button */}
        <button
          type="button"
          className="w-full py-2 text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-400 mt-4"
        >
          Log In with Google
        </button>
        <div className="text-sm text-center text-gray-100">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-800 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
