

import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts"); 
        setPosts(res.data);
      } catch (err) {
        console.log(err.message )
        setError("Failed to load posts. Please try again.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Post
          </Link>
          <Link
            to="/profile"
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Profile
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>


      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow-sm bg-white hover:shadow-md"
            >
            

              <Link
                to={`/posts/${post.id}`}
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                View full post
            </Link>

            

                <p className="text-sm text-gray-500 mb-2">{post.subject}</p>
              <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
