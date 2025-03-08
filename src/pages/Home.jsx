import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to TradeLab</h1>
      <div className="space-x-4">
        <Link to="/register">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
