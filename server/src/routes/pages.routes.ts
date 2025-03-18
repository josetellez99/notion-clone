import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { getAllUserPagesAction, createPageAction, updatePageAction, deletePageAction, getPageByIdAction } from "@/controllers/pages.controller";

const router = express.Router();

router.get("/user/:userId", authenticateJWT, getAllUserPagesAction);
router.get("/:id", authenticateJWT, getPageByIdAction);
router.post('/', authenticateJWT, createPageAction)
router.put("/:id", authenticateJWT, updatePageAction)
router.delete("/:id", authenticateJWT, deletePageAction)

export default router