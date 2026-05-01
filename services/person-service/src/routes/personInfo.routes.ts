import { Router } from "express"
import { getAllPersonInfos, getPersonInfosById, createPersonInfos, updatePersonInfos, deletePersonInfos } from "../controllers/personInfo.controller.js";


console.log("PERSON INFO ROUTES LOADED")

const router = Router();

router.get("/person-info", getAllPersonInfos)

router.get("/person-info/:id", getPersonInfosById)

router.post("/person-info", createPersonInfos)

router.put("/person-info/:id", updatePersonInfos)

router.delete("/person-info/:id", deletePersonInfos)


export default router