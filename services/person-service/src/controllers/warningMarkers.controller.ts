import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ApiResponse.js";
import { getAllWarningMarkersService, getWarningMarkersByIdService, createWarningMarkersService, updateWarningMarkersService, deleteWarningMarkersService } from "../services/warningMarkers.service.js";
import { createWarningMarkerSchema, updateWarningMarkerSchema } from "../validation/warningMarkers.schema.js";


export const getAllWarningMarkers = async (req: Request, res: Response) => {

    try {
        
        const warningMarkers = await getAllWarningMarkersService();

        return res.status(200).json(successResponse(warningMarkers));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getWarningMarkersById = async (req: Request, res: Response) => {

    try {
        const warningMarkers = await getWarningMarkersByIdService(req.params.id as string);

        if(!warningMarkers) {
            return res.status(404).json(errorResponse("Warning markers not found"))
        }

        return res.status(200).json(successResponse(warningMarkers));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createWarningMarkers = async (req: Request, res: Response) => {

    try {
        const result = createWarningMarkerSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const warningMarker = await createWarningMarkersService(result.data)

        return res.status(201).json(successResponse(warningMarker));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updateWarningMarkers = async (req: Request, res: Response) => {

    try {
        const result = updateWarningMarkerSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const warningMarker = await updateWarningMarkersService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(warningMarker));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deleteWarningMarkers = async(req: Request, res: Response) => {

    try {
        
        await deleteWarningMarkersService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}