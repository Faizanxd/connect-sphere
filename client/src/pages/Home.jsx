import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const baseURL = API_BASE_URL.replace(/\/api\/?$/, "");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const fetchedPosts = res.data.posts || res.data.data || res.data;

        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
        } else {
          console.warn("Expected an array of posts, got:", fetchedPosts);
          setPosts([]);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_BASE_URL]);

  return (
    <Layout>
      <div className="flex flex-col p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>

        {loading ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, idx) => {
            const author = post.author || {};
            const content = post.content || "";
            const image = post.image
              ? `${baseURL}/uploads/${post.image}`
              : null;

            const createdDate = new Date(post.createdAt);
            const createdAtFormatted = createdDate.toLocaleString("en-IN", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={post._id || idx}
                className="bg-white p-4 mb-4 rounded-xl shadow-sm border"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600">
                    {author.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium">{author.name || "Anonymous"}</p>
                    <p className="text-xs text-gray-400">
                      {createdAtFormatted}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-2">{content}</p>

                {image && (
                  <img
                    src={image}
                    alt="Post"
                    className="rounded-lg w-full max-h-[500px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                )}

                <div className="flex items-center text-gray-500 text-sm mt-3 space-x-4">
                  <div>🔥 {post.likes?.length || 0}</div>
                  <div>💬 {post.comments?.length || 0}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </Layout>
  );
}
