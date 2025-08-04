import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET routes
router.get("/", getAllPosts);
router.get("/user", protect, getMyPosts);
router.delete("/:id", protect, deletePost);
router.post("/", protect, upload.single("image"), createPost);

export default router;
