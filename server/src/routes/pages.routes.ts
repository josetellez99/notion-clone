import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { getAllUserPagesAction, createPageAction, updatePageAction, deletePageAction } from "@/controllers/pages.controller";

const router = express.Router();

router.get("/", authenticateJWT, getAllUserPagesAction); // 👈 Only authenticated users can access
router.post('/', authenticateJWT, createPageAction)
router.put("/:id", authenticateJWT, updatePageAction)
router.delete("/:id", authenticateJWT, deletePageAction)

export default router