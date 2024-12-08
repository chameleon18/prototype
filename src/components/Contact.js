import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send the form data to EmailJS service
    emailjs
      .sendForm(
        "service_hhc87zc", // Replace with your EmailJS service ID
        "template_zz8rdyh", // Replace with your EmailJS template ID
        form.current, // The form ref (form.current) contains the form data
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
  
  const handleLogin = () => navigate("/login");

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
      <div style={{ background: "linear-gradient(135deg, #6DECBF, #40C1AB, #0A8F96)" }} 
       className=" py-12 px-6 sm:px-8 ">
        <div className="max-w-4xl mx-auto bg-gray-200 bg-opacity-70 border-2 border-gray-300 p-8 rounded-3xl shadow-lg">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center">
            <img src={logo} alt="Chameleon Logo" className="h-30 rounded-full" />
          </div>
          <h2 className="text-3xl font-semibold text-green-500 mb-6 text-center">
            Let's Chat, Reach Out to Us
          </h2>
          <p className="text-xl text-grey-900 text-center mb-8">
            Have questions or feedback? We're here to help. Send us a message, and we'll respond within 24 hours.
          </p>
          <form
            ref={form} // Reference to the form
            onSubmit={sendEmail} // Call the sendEmail function when the form is submitted
            className="space-y-8"
          >
            {/* Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-start text-xl font-medium text-grey-900 "
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-2 p-3 w-full border border-[#ccc] rounded-xl focus:ring-[#5cb85c] focus:outline-none"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-start text-xl font-medium text-grey-900 "
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-2 p-3 w-full border border-[#ccc] rounded-xl focus:ring-[#5cb85c] focus:outline-none"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-start text-xl font-medium text-grey-900 "
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 p-3 w-full border border-[#ccc] rounded-xl focus:ring-[#5cb85c] focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-start text-xl font-medium text-grey-900 "
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-2 p-3 w-full border border-[#ccc] rounded-xl focus:ring-[#5cb85c] focus:outline-none"
                placeholder="Your message here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#78A860]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
