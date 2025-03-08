import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.(com)$/i;
    if (!regex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) {
      toast.error(emailError);
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("✅ Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong! Try again");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-300">
      <Toaster position="top-center" richColors />
      <div className="bg-white p-10 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg shadow-lg text-lg font-semibold transition-all duration-300"
          >
            Login
          </button>
          <p
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-blue-600 hover:underline text-sm"
          >
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
