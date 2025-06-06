import express from "express";

import { 
    getAllBooks, 
    getBookById, 
    createBook, 
    // updateBook, 
    // deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

export default router;