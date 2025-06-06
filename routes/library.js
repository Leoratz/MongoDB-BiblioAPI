import express from "express";

import { 
    getAllLibraries,
    // getLibraryById, 
    // createBook, 
    // updateBook, 
    // deleteBook
} from "../controllers/libraryController.js";

const router = express.Router();

router.get("/", getAllLibraries);
// router.get("/:id", getLibraryById);

export default router;