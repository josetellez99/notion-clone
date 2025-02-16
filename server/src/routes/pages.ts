import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { sendUserPages } from "@/actions/pages";

export const router = express.Router();

router.get("/", authenticateJWT, sendUserPages); // 👈 Only authenticated users can access
