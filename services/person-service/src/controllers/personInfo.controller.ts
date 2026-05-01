import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { getAllPersonInfosService, getPersonInfosByIdService, createPersonInfosService, updatePersonInfosService, deletePersonInfosService } from "../services/personInfo.service.js";
import { createPersonInfoSchema, updatePersonInfoSchema } from "../validation/personInfo.schema.js";



export const getAllPersonInfos = async (req: Request, res: Response) => {

    try {
        
        const personInfos = await getAllPersonInfosService();

        return res.status(200).json(successResponse(personInfos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getPersonInfosById = async (req: Request, res: Response) => {

    try {
        const personInfos = await getPersonInfosByIdService(req.params.id as string);

        if(!personInfos) {
            return res.status(404).json(errorResponse("Person infos not found"))
        }

        return res.status(200).json(successResponse(personInfos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createPersonInfos = async (req: Request, res: Response) => {

    try {
        const result = createPersonInfoSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personInfos = await createPersonInfosService(result.data)

        return res.status(201).json(successResponse(personInfos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updatePersonInfos = async (req: Request, res: Response) => {

    try {
        const result = updatePersonInfoSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const personInfos = await updatePersonInfosService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(personInfos));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deletePersonInfos = async(req: Request, res: Response) => {

    try {
        
        await deletePersonInfosService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}