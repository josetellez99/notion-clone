import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { sendUserPages } from "@/controllers/pages.controller";

export const router = express.Router();

router.get("/", authenticateJWT, sendUserPages); // 👈 Only authenticated users can access
