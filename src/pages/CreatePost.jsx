


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";


const CreatePost = () => {
  const [form, setForm] = useState({ title: "", subject: "", body: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/posts", form); // POST /api/posts
      navigate("/dashboard"); // Go back to dashboard after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <>
     <Link
        to="/dashboard"
        className="text-blue-600 hover:underline"
        >
        Back to Dashboard
    </Link>

    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Body</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            required
            rows="6"
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>

    </>
    
  );
};

export default CreatePost;
