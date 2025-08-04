import React, { useState } from "react";
import axios from "axios";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);

      await axios.post(`${baseURL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setImage(null);
      onPostCreated();
      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[500px] max-w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:ring-2 focus:ring-indigo-300"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Optional Image
            </label>
            <label className="inline-block cursor-pointer bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold px-4 py-2 rounded-md transition duration-200">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>
            {image && (
              <p className="mt-2 text-sm text-gray-500">{image.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700 disabled:opacity-50 font-bold"
          >
            {submitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
