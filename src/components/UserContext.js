import React, { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "../supabaseClient";

// Create the UserContext
export const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
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

    // Set up the listener for auth state changes
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const fetchUserData = async () => {
          const { data: userData } = await supabase
            .from("users")
            .select("username")
            .eq("email", session.user.email)
            .single();
          setUser(userData);
        };
        fetchUserData();
      } else {
        setUser(null);
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
