import { Router } from "express"
import { getAllPersonAliases, getPersonAliasesById, createPersonAliases, updatePersonAliases, deletePersonAliases } from "../controllers/personAliases.controller.js";


console.log("PERSON ALIASES ROUTES LOADED")

const router = Router();


router.get("/person-aliases", getAllPersonAliases)

router.get("/person-aliases/:id", getPersonAliasesById)

router.post("/person-aliases", createPersonAliases)

router.put("/person-aliases/:id", updatePersonAliases)

router.delete("/person-aliases/:id", deletePersonAliases)



export default router