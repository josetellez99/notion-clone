import express from "express";
import { authenticateJWT } from "@/middlewares/authMiddlewares";
import { getAllUserPagesAction, createPageAction, updatePageAction, deletePageAction, getPageByIdAction } from "@/controllers/pages.controller";

const router = express.Router();

router.get("/:userId", authenticateJWT, getAllUserPagesAction);
router.get("/page/:pageId", authenticateJWT, getPageByIdAction);
router.post('/', authenticateJWT, createPageAction)
router.put("/:id", authenticateJWT, updatePageAction)
router.delete("/:id", authenticateJWT, deletePageAction)

export default router