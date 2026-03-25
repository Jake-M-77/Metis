import { Router } from "express";
import { getPersons, createPerson, getPersonById, updatePerson, deletePerson } from "../controllers/person.controller.js";

const router = Router();

router.get("/persons", getPersons);

router.post("/createPerson", createPerson);

router.get("/persons/:id", getPersonById);

router.put("/persons/:id", updatePerson)

router.delete("/persons/:id", deletePerson);

export default router