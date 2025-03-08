import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Register = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Google Sign-Up (for both desktop and mobile)
  const googleSignup = async () => {
    try {
      setLoading(true);
      console.log("Google Signup initiated...");

      const isMobile = window.innerWidth <= 768;
      console.log("Is mobile device:", isMobile);

      if (isMobile) {
        // Use redirect for mobile
        console.log("Mobile sign-in with redirect...");
        await signInWithRedirect(auth, googleProvider); // Mobile redirect
      } else {
        // Use popup for desktop
        console.log("Desktop sign-in with popup...");
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Popup result:", result);

        const userData = {
          firstName: result.user.displayName.split(" ")[0],
          lastName: result.user.displayName.split(" ").slice(1).join(" "),
          email: result.user.email,
        };
        setUser(userData);
        console.log("User signed up:", userData);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Google Signup Error:", error);
    }
  };

  // Check for redirect result after the page reload
  useEffect(() => {
    const checkRedirectResult = async () => {
      console.log("Checking for redirect result...");

      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result found:", result);
          const userData = {
            firstName: result.user.displayName.split(" ")[0],
            lastName: result.user.displayName.split(" ").slice(1).join(" "),
            email: result.user.email,
          };
          setUser(userData);
          console.log("User signed up from redirect:", userData);
        } else {
          console.log("No redirect result found, checking auth state...");
          onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log("User signed in (onAuthStateChanged):", user);
              const userData = {
                firstName: user.displayName.split(" ")[0],
                lastName: user.displayName.split(" ").slice(1).join(" "),
                email: user.email,
              };
              setUser(userData);
              console.log("User signed up:", userData);
            } else {
              console.log("No user signed in yet.");
            }
          });
        }
      } catch (error) {
        console.error("Error during redirect result check:", error);
      }
    };

    checkRedirectResult();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-lg shadow-lg text-lg font-semibold transition-all duration-300"
          onClick={googleSignup}
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup with Google"}
        </button>

        {/* Display User Info if available */}
        {user && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">User Info</h3>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
