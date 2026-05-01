import { getAllPersonAliasesService, createPersonAliasesService, updatePersonAliasesService, deletePersonAliasesService, getPersonAliasesByIdService } from "../services/personAliases.service.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { createPersonAliasSchema, updatePersonAliasSchema } from "../validation/personAliases.schema.js";
import type { Request, Response } from "express";


export const getAllPersonAliases = async (req: Request, res: Response) => {

    try {
        
        const personAliases = await getAllPersonAliasesService();

        return res.status(200).json(successResponse(personAliases));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getPersonAliasesById = async (req: Request, res: Response) => {

    try {
        const personAliases = await getPersonAliasesByIdService(req.params.id as string);

        if(!personAliases) {
            return res.status(404).json(errorResponse("Person aliases not found"))
        }

        return res.status(200).json(successResponse(personAliases));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createPersonAliases = async (req: Request, res: Response) => {

    try {
        const result = createPersonAliasSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personAliases = await createPersonAliasesService(result.data)

        return res.status(201).json(successResponse(personAliases));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updatePersonAliases = async (req: Request, res: Response) => {

    try {
        const result = updatePersonAliasSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personAliases = await updatePersonAliasesService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(personAliases));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deletePersonAliases = async(req: Request, res: Response) => {

    try {
        
        await deletePersonAliasesService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}