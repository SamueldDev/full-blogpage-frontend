


import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        Welcome to Mini-Blog
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
        Your own space to write, reflect, and share your thoughts.
        Simple. Secure. Personal.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 px-6 py-3 rounded hover:bg-gray-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
