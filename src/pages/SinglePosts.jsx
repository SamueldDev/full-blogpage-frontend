

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";



const SinglePosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", body: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setForm({
          title: res.data.title,
          subject: res.data.subject,
          body: res.data.body,
        });
      } catch (err) {
        console.log(err.message)
        setError("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/dashboard");
    } catch (err) {
        console.error(err.message)
      alert("Failed to delete.");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await api.put(`/posts/${id}`, form);
    setEditMode(false);
    const updated = await api.get(`/posts/${id}`);
    setPost(updated.data);
  } catch (err) {
    console.error(err.message);
    alert("Update failed.");
  }
};



  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (

    <>
    <Link
            to="/dashboard"
            className="text-blue-600 hover:underline"
            >
            Back to Dashboard
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            rows={6}
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{post.subject}</p>
          <p className="text-gray-700 whitespace-pre-wrap mb-6">{post.body}</p>

          <div className="flex gap-4">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
    
    </>


  

  );
};

export default SinglePosts;
