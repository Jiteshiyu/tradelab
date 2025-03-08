import React, { useState, useEffect } from "react"; 
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Register = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Google Sign-Up using Redirect
  const googleSignup = async () => {
    try {
      setLoading(true);
      console.log("Google Signup initiated...");

      // Trigger redirect flow
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      setLoading(false);
      console.error("Google Signup Error:", error);
    }
  };

  // Handle redirect result after authentication
  useEffect(() => {
    // This will be triggered when the user is redirected back
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const userData = {
            firstName: result.user.displayName.split(" ")[0],
            lastName: result.user.displayName.split(" ").slice(1).join(" "),
            email: result.user.email,
          };
          setUser(userData);
          console.log("User signed up:", userData);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error getting redirect result:", error);
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
