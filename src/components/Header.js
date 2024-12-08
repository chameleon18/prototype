import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUser } from "../components/UserContext"; 
import { FaUserCircle } from "react-icons/fa"; 
import logo from "../assets/logo.png";
import LoginPage from './Loginpage'; // Import the LoginPage component

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false); // State to show/hide the login form

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)",
      }}
      className="flex justify-between items-center p-5 text-white"
    >
      {/* Logo */}
      <Link to="/"><img src={logo} alt="Chameleon Logo" className="h-12" /></Link>

      {/* Navigation Menu */}
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline text-white">
          Home
        </Link>
        <Link to="/contactus" className="hover:underline text-white">
          Contact us
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center space-x-2 bg-primary-dark py-2 px-4 rounded text-white relative"
          >
            <FaUserCircle size={20} /> {/* Profile Icon */}
            <span>{user ? user.username : "Log in / Sign in"}</span>
            <span
              className={`ml-2 transform transition-transform duration-200 ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {showDropdown && (
            <div
              className="absolute right-0 mt-2 bg-white text-black py-2 px-4 shadow-lg rounded-lg w-48 z-10"
              onMouseLeave={() => setShowDropdown(false)}
            >
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left hover:bg-gray-100 py-2 px-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setIsLoginVisible(true)} // Show the login form
                    className="w-full text-left hover:bg-gray-100 py-2 px-2 rounded"
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Login form slide-in */}
      {isLoginVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white transition-transform transform translate-x-0 shadow-lg">
            <LoginPage closeLogin={() => setIsLoginVisible(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
