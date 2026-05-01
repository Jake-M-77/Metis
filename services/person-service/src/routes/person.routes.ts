import { Router } from "express";
import { getPersons, createPerson, getPersonById, updatePerson, deletePerson, getPersonByFirstName, getPersonWarningMarkers, getPersonActivePhoneNumber, getPersonActiveEmailAddress, getPersonActiveHomeAddress, getPersonBailConditions, getPersonDescriptions, getPersonAliases, getPersonCustodyPhotos, getPersonDocuments } from "../controllers/person.controller.js";


console.log("ROUTES LOADED")

const router = Router();

router.get("/persons", getPersons);

router.post("/persons", createPerson);

router.put("/persons/:id", updatePerson);


//Search

router.get("/persons/search/", getPersonByFirstName);


// Between these dashes have the ApiResponse implemented

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

//Get person bail conditions
router.get("/persons/:id/bail-conditions", getPersonBailConditions);

//Get person descriptions
router.get("/persons/:id/descriptions", getPersonDescriptions)

//Get person alias details
router.get("/persons/:id/aliases", getPersonAliases)

//Get person custody photos
router.get("/persons/:id/custody-photos", getPersonCustodyPhotos)

//Get person documents
router.get("/persons/:id/documents", getPersonDocuments)


///////////////////////////////////////////////



router.delete("/persons/:id", deletePerson);




export default router