import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { getAllUserPagesAction } from "@/controllers/pages.controller";

export const router = express.Router();

router.get("/", authenticateJWT, getAllUserPagesAction); // 👈 Only authenticated users can access
router.post('/', authenticateJWT, )