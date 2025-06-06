import express from "express";

import { 
    getAllLibraries,
    getLibraryById, 
    createLibrary, 
    updateLibrary, 
    deleteLibrary, 
    AllStockBylibrary
} from "../controllers/libraryController.js";

const router = express.Router();

router.get("/AllStockBylibrary", AllStockBylibrary);
router.get("/", getAllLibraries);
router.get("/:id", getLibraryById);
router.post("/", createLibrary);
router.put("/:id", updateLibrary);
router.delete("/:id", deleteLibrary);



export default router;