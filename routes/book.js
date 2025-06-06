import express from "express";

import { 
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook,
    getBookStats
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/stats", getBookStats);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
export default router;