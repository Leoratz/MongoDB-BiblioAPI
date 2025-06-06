import express from "express";

import { 
    getAllClients, 
    getClientById, 
    // createBook, 
    // updateBook, 
    // deleteBook
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);

export default router;