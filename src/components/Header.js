import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { supabase } from "../supabaseClient";
import { useUser } from "../components/UserContext"; // Correctly import useUser

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Use the useUser hook to get user data

  const handleLogin = () => navigate("/login");
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const [showLogout, setShowLogout] = useState(false);

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)",
      }}
      className="flex justify-between items-center p-5 text-white from-primary to-primary-light"
    >
      <img src={logo} alt="Chameleon Logo" className="h-12" />
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline text-white">
          Home
        </Link>
        <Link to="/about" className="hover:underline text-white">
          About us
        </Link>
        <Link to="/contactus" className="hover:underline text-white">
          Contact us
        </Link>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowLogout((prev) => !prev)}
              className="bg-primary-dark py-2 px-4 rounded text-white"
            >
              {user.username}
            </button>
            {showLogout && (
              <div
                className="absolute right-0 mt-2 bg-white py-2 px-4 shadow-lg rounded-lg"
                onMouseLeave={() => setShowLogout(false)}
              >
                <button
                  onClick={handleLogout}
                  className="text-green-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 border border-white rounded-full hover:bg-primary-light hover:text-primary-dark transition"
          >
            Log in / Sign in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
