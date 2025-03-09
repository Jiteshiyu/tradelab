import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Register = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      console.log("Redirecting for Google Sign-In...");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Register;
