import { Router } from "express";
import { getAllWarningMarkers, getWarningMarkersById, createWarningMarkers, updateWarningMarkers, deleteWarningMarkers } from "../controllers/warningMarkers.controller.js";


console.log("WARNING MARKERS ROUTES LOADED")

const router = Router();

router.get("/warning-markers", getAllWarningMarkers)

router.get("/warning-markers/:id", getWarningMarkersById)

router.post("/warning-markers", createWarningMarkers)

router.put("/warning-markers/:id", updateWarningMarkers)

router.delete("/warning-markers/:id", deleteWarningMarkers)


export default router