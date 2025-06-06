import express from "express";

import { 
    getAllClients, 
    getClientById, 
    createClient, 
    updateClient, 
    deleteClient,
    buyBook,
    mediumPurchaseByClient
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
router.post("/:clientId/buy", buyBook);
router.get("/stats/:id", mediumPurchaseByClient)

export default router;