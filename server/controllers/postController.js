import Post from "../models/Post.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!content && !image) {
    return res.status(400).json({ message: "Post content or image required" });
  }

  try {
    const newPost = new Post({
      content,
      author: req.user.id,
      image,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name"); // this will replace author ID with the user object containing just the name

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: err.message,
    });
  }
};

// GET posts by logged-in user (no need for :userId param)
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the logged-in user owns the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Remove uploaded image if exists
    if (post.image) {
      const imagePath = path.join(__dirname, "..", "uploads", post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Post.deleteOne({ _id: post._id });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
