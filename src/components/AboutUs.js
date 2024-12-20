// src/components/AboutUs.js
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import aboutImage1 from '../assets/aboutus/1img.svg';
import aboutImage2 from '../assets/aboutus/mission.svg';
import aboutImage3 from '../assets/aboutus/goal.svg';
import aboutImage4 from '../assets/aboutus/objec.png';
import { supabase } from "../supabaseClient";

function AboutUs() {
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
      {/* Custom Header for About Us Page */}

      {/* About Us Content */}
      <div className="py-10 px-5 md:px-20 lg:px-32 text-gray-800">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">About Us</h1>
        <p className="mb-6 text-center">
          In today's convenience-driven world, food delivery services like Swiggy, Zomato, Eatsure, Ola Foods, etc., are essential. However, with so many choices, finding the best deal and the tastiest dishes can be overwhelming.
          Enter a New Era of Food Ordering: our innovative Price Comparison and Recommendation App, designed to transform your food ordering experience.
        </p>
        <p className="mb-8 text-center">
          This app goes beyond menu browsing, empowering you to be a savvy food connoisseur by serving as your one-stop shop for price comparisons and personalized recommendations across various food delivery platforms. Additionally, our app also gives you a platform where customers can compare the listings of groceries on various groceries delivery platforms, making you a rational buyer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Section 1: Image and Mission */}
          <div className="flex flex-col items-center justify-center text-center">
          <img src={aboutImage1} alt="About Us" className="w-full max-w-xs mb-4 rounded-lg shadow-lg" />
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Mission</h2>
          <p>
          Our mission is to empower users to make informed food choices by delivering a seamless platform that combines price comparison and personalized recommendations. We aim to simplify the food ordering process and make it convenient, economical, and enjoyable.
          </p>
          </div>


          {/* Section 2: Goal (Image First) */}
          <div className="flex flex-col items-center justify-center text-center">
          <img src={aboutImage2} alt="Our Goal" className="w-full max-w-xs mb-4 rounded-lg shadow-lg" />
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Goal</h2>
          <p>
          To achieve 1 million downloads within the first year of launch by offering a reliable and innovative platform that meets the evolving needs of food lovers. We aim to build a loyal user base by continuously improving our app's features, ensuring exceptional user experience, and providing unparalleled value in every order.
          </p>
          </div>


          {/* Section 3: Objective */}
            <div className="flex flex-col items-center justify-center text-center">
            <img src={aboutImage3} alt="Our Objective" className="w-full max-w-xs mb-4 rounded-lg shadow-lg" />
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Objective</h2>
          <p>
          To create a comprehensive and user-friendly app that enhances the food ordering experience by providing price comparisons and personalized recommendations.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
