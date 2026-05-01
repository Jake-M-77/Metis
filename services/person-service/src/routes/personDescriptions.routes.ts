import { Router } from "express"
import { getAllPersonDescriptions, getPersonDescriptionsById, createPersonDescriptions, updatePersonDescriptions, deletePersonDescriptions } from "../controllers/personDescriptions.controller.js";


console.log("PERSON DESCRIPTION ROUTES LOADED")



const router = Router();

router.get("/person-descriptions", getAllPersonDescriptions)

router.get("/person-descriptions/:id", getPersonDescriptionsById)

router.post("/person-descriptions", createPersonDescriptions)

router.put("/person-descriptions/:id", updatePersonDescriptions)

router.delete("/person-descriptions/:id", deletePersonDescriptions)


export default router