import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const baseURL = API_BASE_URL.replace(/\/api\/?$/, "");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) return;

    const fetchProfileData = async () => {
      try {
        const userRes = await axios.get(`${API_BASE_URL}/users/me`, {
          headers,
        });
        const postRes = await axios.get(`${API_BASE_URL}/posts/user`, {
          headers,
        });

        setUser(userRes.data);
        setPosts(postRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [API_BASE_URL]);

  const handleDelete = async (postId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
        headers,
      });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col p-6 w-full max-w-3xl">
        {/* Profile Info */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Posts by {user.name}</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 mb-4 rounded-xl shadow-sm border"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-2">{post.content}</p>

                {post.image && (
                  <img
                    src={`${baseURL}/uploads/${post.image}`}
                    alt="post"
                    className="rounded-lg w-full max-h-[500px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                )}

                <div className="flex items-center text-gray-500 text-sm mt-3 space-x-4">
                  <div>🔥 0</div>
                  <div>💬 0</div>
                  <button
                    className="ml-auto text-red-500 hover:text-red-600 px-3 py-1 text-sm rounded-md border border-red-200 hover:border-red-400 transition"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
