import { Router } from "express"
import { getAllCustodyPhotos, getCustodyPhotosById, createCustodyPhotos, updateCustodyPhotos, deleteCustodyPhotos, batchCustodyPhotos } from "../controllers/custodyPhotos.controller.js"


console.log("CUSTODY PHOTOS ROUTES LOADED")

const router = Router()


router.get("/custody-photos", getAllCustodyPhotos)

router.get("/custody-photos/:id", getCustodyPhotosById)

router.post("/custody-photos", createCustodyPhotos)

router.put("/custody-photos/:id", updateCustodyPhotos)

router.delete("/custody-photos/:id", deleteCustodyPhotos)


router.post("/custody-photos/batch", batchCustodyPhotos)



export default router