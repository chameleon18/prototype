import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { supabase } from "../supabaseClient";
import emailjs from "emailjs-com";
import logoimg from "../assets/logo.png";

const Contact = () => {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hhc87zc", // Replace with your EmailJS service ID
        "template_zz8rdyh", // Replace with your EmailJS template ID
        form.current,
        "OwQFIsLMewuU4Zhh2" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("Error sending message:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );

    e.target.reset(); // Reset the form fields after submission
  };



    const navigate = useNavigate();

    const handleLogin = () =>  navigate("/login");

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
        const { data: userData } = await supabase
          .from("users")
          .select("username")
          .eq("email", sessionData.session.user.email)
          .single();

        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-5 bg-gradient-to-b from-green-300 to-green-500 text-white">
        <img src={logo} alt="Chameleon Logo" className="h-12" />
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About us</Link>
          <Link to="/contactus" className="hover:underline">Contact us</Link>

          {user ? (
            <button className="bg-green-500 py-2 px-4 rounded">
            {user.username}
          </button>
          ) : (
            <button onClick={handleLogin} className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-green-500 transition">
            Log in / Sign in
          </button>
          )
          }
        </nav>
      </header>
    
    
      <div class="bg-blue-300 py-12 px-6 sm:px-8">
  <div class="max-w-4xl mx-auto bg-blue-200 p-8 rounded-lg shadow-lg">
  <img src={logoimg} alt="Chameleon Logo" className="h-30 rounded-full mx-auto" />
    <h2 class="text-3xl font-semibold text-[#333333] mb-6">Contact Us</h2>
    <form action="#" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-8">
     
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-start text-2xl pl-2 font-medium text-[#333333]">Full Name</label>
          <input type="text" id="name" name="name" class="mt-2 p-3 w-full border bg-grey-600 border-[#78A860] rounded-3xl focus:ring-[#A7D189] focus:outline-none" placeholder="Enter your name" required />
        </div>

        <div>
          <label for="email" class="block text-start text-2xl pl-2 font-medium text-[#333333]">Email Address</label>
          <input type="email" id="email" name="email" class="mt-2 p-3 w-full border border-[#78A860] rounded-3xl focus:ring-[#A7D189] focus:outline-none" placeholder="Enter your email" required />
        </div>
      </div>

      
      <div class="space-y-4">
        <div>
          <label for="message" class="block text-start text-2xl pl-2 font-medium text-[#333333]">Message</label>
          <textarea id="message" name="message" rows="4" class="mt-2 p-3 w-full border border-[#78A860] rounded-3xl focus:ring-[#A7D189] focus:outline-none" placeholder="Your message here" required></textarea>
        </div>

        <button type="submit" class="w-full bg-green-500 text-white font-semibold py-3 rounded-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#78A860]">
          Send Message
        </button>
      </div>
    </form>
  </div>
</div>



    </div>
  )
}

export default Contact
