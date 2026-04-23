import { Router } from "express";
import { getPersons, createPerson, getPersonById, updatePerson, deletePerson, getPersonByFirstName, getPersonWarningMarkers, getPersonActivePhoneNumber, getPersonActiveEmailAddress, getPersonActiveHomeAddress } from "../controllers/person.controller.js";


console.log("ROUTES LOADED")

const router = Router();

router.get("/persons", getPersons);

router.post("/persons", createPerson);

//Search

router.get("/persons/search/", getPersonByFirstName);




// Get person by ID
router.get("/persons/:id", getPersonById);

//Get Person active Phone number
router.get("/persons/:id/active/number", getPersonActivePhoneNumber);

//Get Person active email address
router.get("/persons/:id/active/email", getPersonActiveEmailAddress);

//Get person active address
router.get("/persons/:id/active/address", getPersonActiveHomeAddress);

//Get person warning markers
router.get("/persons/:id/warning-markers", getPersonWarningMarkers);

router.put("/persons/:id", updatePerson)

router.delete("/persons/:id", deletePerson);




export default router