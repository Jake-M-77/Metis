import { Router } from "express"
import { getAllPersonAssociations, createPersonAssociations, updatePersonAssociations, deletePersonAssociations, getPersonAssociationsById, getPersonAssociationsByPersonId } from "../controllers/personAssociations.controller.js";


console.log("PERSON ASSOCIATION ROUTES LOADED")

const router = Router();

router.get("/person-associations", getAllPersonAssociations)

router.get("/person-associations/:id", getPersonAssociationsById)

router.post("/person-associations", createPersonAssociations)

router.put("/person-associations/:id", updatePersonAssociations)

router.delete("/person-associations/:id", deletePersonAssociations)

router.get("/person-associations/pid/:id", getPersonAssociationsByPersonId) // This will probably be updated. 


export default router