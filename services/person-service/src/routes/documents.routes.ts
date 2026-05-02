import { Router } from "express"
import { getAllDocuments, getDocumentsById, createDocuments, updateDocuments, deleteDocuments } from "../controllers/documents.controller.js";


console.log("DOCUMENT ROUTES LOADED")

const router = Router();

router.get("/documents", getAllDocuments)

router.get("/documents/:id", getDocumentsById)

router.post("/documents/", createDocuments)

router.put("/documents/:id", updateDocuments)

router.delete("/documents/:id", deleteDocuments)


export default router