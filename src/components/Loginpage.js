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
      className="min-h-screen flex items-center justify-center "
    >
      <div className="w-full max-w-4xl p-8 space-y-6 bg-blue-100 border-2 border-blue-300 rounded-3xl mt-5 mb-5">
  <div className="flex space-x-8">
    {/* Left Column */}
    <div className="flex-1 flex items-center justify-center">
      <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full" />
    </div>
    <div className="text-center text-3xl font-bold text-black mb-4">
      <h2 className="text-center text-3xl font-bold text-black mb-4">Log In</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission from refreshing the page
          handleLogin(); // Call the handleLogin function
        }}
      >
        <div className="flex space-x-4">
          {/* Email Field */}
          <div className="w-1/2">
            <label className="block text-start pl-3 text-xl font-bold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="Enter your email"
              className="w-full px-6 py-4 mt-1 border rounded-3xl bg-grey-200 text-lg"
              required
            />
          </div>
          {/* Password Field */}
          <div className="w-1/2">
            <label className="block text-start pl-3 text-xl font-bold text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Enter your password"
              className="w-full px-6 py-4 mt-1 border rounded-3xl bg-grey-200 text-lg"
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full py-2.5 text-lg font-bold text-white bg-green-400 rounded-3xl hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Log In
          </button>
          {/* Google Login Button */}
          <button
            type="button"
            className="w-full py-2.5 text-lg font-bold text-white bg-indigo-400 rounded-3xl hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-400"
          >
            Log In with Google
          </button>
        </div>
      </form>
      <div className="text-sm text-center text-black mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-indigo-800 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default LoginPage;
