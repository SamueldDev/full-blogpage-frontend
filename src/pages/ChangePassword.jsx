

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => navigate("/profile"), 1500); // Go back to profile after success
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed.");
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

         <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>

      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>

    </>

  );
};

export default ChangePassword;
