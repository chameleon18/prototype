import React, { useState } from "react";
import logo from "../assets/logo.png";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ closeLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  // Reset form state
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setAgreeTerms(false);
  };

  // Handle login functionality
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed: " + error.message);
        return;
      }

      console.log("Login successful:", data);
      alert("Login successful! Welcome!");

       // Close the login form after successful login
       closeLogin();

      // Reset form after successful login
      resetForm();

      // Redirect to home page or dashboard
      navigate("/");
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };

  // Handle signup functionality
  const handleSignUp = async () => {
    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    try {
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

        // Reset form after successful signup
        resetForm();

        // Optionally toggle back to login view
        setIsLogin(true);

        // Redirect to home page or dashboard
        navigate("/");
      }
    } catch (err) {
      console.error("Unexpected error during sign-up:", err);
      alert("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-lg max-w-md w-full">
      <button 
        onClick={closeLogin} 
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
        ✕
      </button>
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Chameleon Logo" className="h-13" />
        </div>

        {/* Title and Toggle between Login and Signup */}
        <h4 className="text-center text-2xl font-extrabold text-gray-900">
          {isLogin ? "Log In" : "Sign Up"}
        </h4>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
              >
                Log In
              </span>
            </>
          )}
        </p>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (isLogin) {
              handleLogin();
            } else {
              handleSignUp();
            }
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Common Fields */}
            <div>
              <label className="block text-start text-xl font-bold text-black">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border text-black rounded-xl bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-start text-xl font-bold text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border text-black rounded-xl bg-gray-100"
                required
              />
            </div>

            {/* Signup Specific Fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-start text-xl font-bold text-gray-900">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-2 mt-1 border  rounded-xl bg-gray-100 text-gray-900"
                    required
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center pt-4">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    required
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    <span className="text-grey-900">
                      I agree to the{" "}
                      <a href="#" className="text-green-600 underline">
                        Terms & Conditions
                      </a>
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-green-600 rounded-3xl hover:bg-green-800 focus:outline-none"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
