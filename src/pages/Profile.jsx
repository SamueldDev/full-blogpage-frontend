

import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import api from "../api/axios";


const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("This will permanently delete your account.")) return;

    try {
      await api.delete(`/user/delete-account`);
      logout();
      navigate("/");
    } catch (err) {
        console.log(err.message)
      alert("Failed to delete account.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // 👈 backend must use multer or similar

    try {
      setUploading(true);
      const res = await api.put("/user/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

       // ✅ Update user context and localStorage
    const updatedUser = { ...user, profileImage: res.data.imageUrl };
    setUser(updatedUser); // updates AuthContext state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // persists across refresh

      setUser({ ...user, profileImage: res.data.imageUrl });
    } catch (err) {
      console.error(err.message);
      setError("Image upload failed.");
    } finally {
      setUploading(false);
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
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
    
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col items-center space-y-4 mb-6">
        <img
          src={user?.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <input
          type="file"
          ref={fileRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Change Profile Picture"}
        </button>
      </div>


    {/* <div className="mb-4 space-y-3">
        <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
            type="text"
            value={user?.name || ""}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
            />
        </div>
        <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
            />
        </div>
    </div> */}

        <Link
            to="/change-password"
            className="inline-block mt-4 text-sm text-blue-600 underline"
            >
            Change Password
        </Link>

      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
    </>
    
  );
};

export default Profile;
