import { errorResponse, successResponse } from "../utils/ApiResponse.js";
import type { Request, Response } from "express";
import { createPersonAssociationSchema, updatePersonAssociationSchema } from "../validation/personAssociations.schema.js";
import { getAllPersonAssociationsService, createPersonAssociationsService, updatePersonAssociationsService, deletePersonAssociationsService, getPersonAssociationsByIdService, getPersonAssociationsByPersonIdService } from "../services/personAssociations.service.js";



export const getAllPersonAssociations = async (req: Request, res: Response) => {


    try {

        const personAssociations = await getAllPersonAssociationsService();

        return res.status(200).json(successResponse(personAssociations));
    }catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }
}

export const getPersonAssociationsById = async (req: Request, res: Response) => { 

    try {
        const personAssociations = await getPersonAssociationsByIdService(req.params.id as string);

        if(!personAssociations) {
            return res.status(404).json(errorResponse("No person associates found"))
        }

        return res.status(200).json(successResponse(personAssociations));
    }catch (error) 
    {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const getPersonAssociationsByPersonId = async (req: Request, res: Response) => { 

    try {
        const personAssociations = await getPersonAssociationsByPersonIdService(req.params.id as string);

        if(!personAssociations) {
            return res.status(404).json(errorResponse("No person associates found"))
        }

        return res.status(200).json(successResponse(personAssociations));
    }catch (error) 
    {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createPersonAssociations = async (req: Request, res: Response) => {

    try {
        const result = createPersonAssociationSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personAssociations = await createPersonAssociationsService(result.data)

        return res.status(201).json(successResponse(personAssociations));
    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }
    
}

export const updatePersonAssociations = async (req: Request, res: Response) => { 

    try {
        const result = updatePersonAssociationSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personAssociations = await updatePersonAssociationsService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(personAssociations));

    }catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const deletePersonAssociations = async (req: Request, res: Response) => { 

    try {

        await deletePersonAssociationsService(req.params.id as string);

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}