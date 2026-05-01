import { Router } from "express";
import { createComms, getAllComms, updateComms, deleteComms, getCommsById } from "../controllers/comms.controller.js";

console.log("COMMS ROUTES LOADED")


const router = Router();

// commented out for the time being
router.get("/comms", getAllComms); 

router.get("/comms/:id", getCommsById)

router.post("/comms", createComms);

router.put("/comms/:id", updateComms);

router.delete("/comms/:id", deleteComms);



export default router