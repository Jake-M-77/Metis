import { getAllPersonDescriptionsService, createPersonDescriptionsService, updatePersonDescriptionsService, deletePersonDescriptionsService, getPersonDescriptionsByIdService } from "../services/personDescriptions.service.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { createPersonDescriptionSchema, updatePersonDescriptionSchema } from "../validation/personDescriptions.schema.js";
import type { Request, Response } from "express";




export const getAllPersonDescriptions = async (req: Request, res: Response) => {

    try {
        
        const personDescriptions = await getAllPersonDescriptionsService();

        return res.status(200).json(successResponse(personDescriptions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getPersonDescriptionsById = async (req: Request, res: Response) => {

    try {
        const personDescriptions = await getPersonDescriptionsByIdService(req.params.id as string);

        if(!personDescriptions) {
            return res.status(404).json(errorResponse("Person descriptions not found"))
        }

        return res.status(200).json(successResponse(personDescriptions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createPersonDescriptions = async (req: Request, res: Response) => {

    try {
        const result = createPersonDescriptionSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personDescriptions = await createPersonDescriptionsService(result.data)

        return res.status(201).json(successResponse(personDescriptions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updatePersonDescriptions = async (req: Request, res: Response) => {

    try {
        const result = updatePersonDescriptionSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personDescriptions = await updatePersonDescriptionsService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(personDescriptions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deletePersonDescriptions = async(req: Request, res: Response) => {

    try {
        
        await deletePersonDescriptionsService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}