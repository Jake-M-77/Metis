import { Router } from "express"
import { getAllBailConditions, getBailConditionsById, createBailConditions, updateBailConditions, deleteBailConditions } from "../controllers/bailConditions.controller.js";



console.log("BAIL CONDITIONS ROUTES LOADED")

const router = Router();

router.get("/bail-conditions", getAllBailConditions)

router.get("/bail-conditions/:id", getBailConditionsById)

router.post("/bail-conditions", createBailConditions)

router.put("/bail-conditions/:id", updateBailConditions)

router.delete("/bail-conditions/:id", deleteBailConditions)



export default router