import React, { useState, useEffect } from "react"; 
import {
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

      // Use the redirect method for both desktop and mobile
      await signInWithRedirect(auth, googleProvider);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Google Signup Error:", error);
    }
  };

  // Listen for auth state change and handle redirect result
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        // This is the important part: handling the redirect result
        const result = await getRedirectResult(auth);
        if (result) {
          const userData = {
            firstName: result.user.displayName.split(" ")[0],
            lastName: result.user.displayName.split(" ").slice(1).join(" "),
            email: result.user.email,
          };
          setUser(userData);
          console.log("User signed in (redirect):", userData);
        } else {
          console.log("No redirect result yet.");
        }
      } catch (error) {
        console.error("Error fetching redirect result:", error);
      }
    };

    // Always try to fetch the redirect result after the page reloads
    fetchRedirectResult();

    // Optionally, you can listen for auth state change here too
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in (onAuthStateChanged):", user);
        const userData = {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ").slice(1).join(" "),
          email: user.email,
        };
        setUser(userData);
      } else {
        console.log("No user signed in yet.");
      }
    });
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
