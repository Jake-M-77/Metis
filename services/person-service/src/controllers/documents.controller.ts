import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { getAllDocumentsService, getDocumentsByIdService, createDocumentsService, updateDocumentsService, deleteDocumentsService } from "../services/documents.service.js";
import { createDocumentSchema, updateDocumentSchema } from "../validation/document.schema.js";



export const getAllDocuments = async (req: Request, res: Response) => {

    try {
        
        const documents = await getAllDocumentsService();

        return res.status(200).json(successResponse(documents));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getDocumentsById = async (req: Request, res: Response) => {

    try {
        const documents = await getDocumentsByIdService(req.params.id as string);

        if(!documents) {
            return res.status(404).json(errorResponse("Documents not found"))
        }

        return res.status(200).json(successResponse(documents));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createDocuments = async (req: Request, res: Response) => {

    try {
        const result = createDocumentSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const documents = await createDocumentsService(result.data)

        return res.status(201).json(successResponse(documents));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updateDocuments = async (req: Request, res: Response) => {

    try {
        const result = updateDocumentSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const documents = await updateDocumentsService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(documents));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deleteDocuments = async(req: Request, res: Response) => {

    try {
        
        await deleteDocumentsService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}