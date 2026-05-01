import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { getAllCustodyPhotosService, getCustodyPhotosByIdService, createCustodyPhotosService, deleteCustodyPhotosService, updateCustodyPhotosService } from "../services/custodyPhotos.service.js";
import { createCustodyPhotoSchema, updateCustodyPhotoSchema } from "../validation/custodyPhotos.schema.js";



export const getAllCustodyPhotos = async (req: Request, res: Response) => {

    try {
        
        const custodyPhotos = await getAllCustodyPhotosService();

        return res.status(200).json(successResponse(custodyPhotos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getCustodyPhotosById = async (req: Request, res: Response) => {

    try {
        const custodyPhotos = await getCustodyPhotosByIdService(req.params.id as string);

        if(!custodyPhotos) {
            return res.status(404).json(errorResponse("Custody Photos not found"))
        }

        return res.status(200).json(successResponse(custodyPhotos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createCustodyPhotos = async (req: Request, res: Response) => {

    try {
        const result = createCustodyPhotoSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const custodyPhotos = await createCustodyPhotosService(result.data)

        return res.status(201).json(successResponse(custodyPhotos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updateCustodyPhotos = async (req: Request, res: Response) => {

    try {
        const result = updateCustodyPhotoSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const custodyPhotos = await updateCustodyPhotosService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(custodyPhotos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deleteCustodyPhotos = async(req: Request, res: Response) => {

    try {
        
        await deleteCustodyPhotosService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}