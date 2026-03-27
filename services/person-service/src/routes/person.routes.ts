import { Router } from "express";
import { getPersons, createPerson, getPersonById, updatePerson, deletePerson, getPersonByFirstName } from "../controllers/person.controller.js";


console.log("ROUTES LOADED")

const router = Router();

router.get("/persons", getPersons);

router.post("/persons", createPerson);

//Search

router.get("/persons/search/", getPersonByFirstName);


router.get("/persons/:id", getPersonById);

router.put("/persons/:id", updatePerson)

router.delete("/persons/:id", deletePerson);




export default router