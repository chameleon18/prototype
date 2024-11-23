import React from "react";
import logo from '../assets/logo.png';

const Loginpage = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)' }} className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-40 shadow-md backdrop-blur-md overflow-hidden border-2 border-gray-700 rounded-[9.3%]">
    <img src={logo} alt="Chameleon Logo" className="h-21 rounded-full mx-auto" />
    <h2 className="text-center text-3xl font-bold text-gray-100">Welcome to Chameleon</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-start pl-3 text-xl font-bold text-gray-100">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 bg-black bg-opacity-20 shadow-md backdrop-blur-md overflow-hidden text-lg "
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
      <button
        type="submit"
        className="w-full py-2 text-white bg-green-400 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-900"
      >
        Login
      </button>
    </form>
    {/* Google Login Button */}
    <button
      type="button"
      className="w-full py-2 text-white bg-indigo-400 rounded-lg hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-700 mt-4"
    >
      Login with Google
    </button>
    <div className="text-sm text-center text-gray-100">
      Don’t have an account?{" "}
      <a href="/signup" className="text-indigo-900 hover:underline">
        Sign up
      </a>
    </div>
  </div>
</div>

  );
};

export default Loginpage;
