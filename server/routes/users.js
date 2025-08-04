import express from "express";
import { getUserById } from "../controllers/userController.js";
import { getMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/:id", getUserById);

export default router;
