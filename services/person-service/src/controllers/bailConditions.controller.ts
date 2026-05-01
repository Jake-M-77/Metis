import { getAllBailConditionsService, getBailConditionsByIdService, createBailConditionsService, updateBailConditionsService, deleteBailConditionsService } from "../services/bailConditions.service.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { createBailConditionSchema, updateBailConditionSchema } from "../validation/bailConditions.schema.js";
import type { Request, Response } from "express";


export const getAllBailConditions = async (req: Request, res: Response) => {

    try {
        
        const bailConditions = await getAllBailConditionsService();

        return res.status(200).json(successResponse(bailConditions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getBailConditionsById = async (req: Request, res: Response) => {

    try {
        const bailConditions = await getBailConditionsByIdService(req.params.id as string);

        if(!bailConditions) {
            return res.status(404).json(errorResponse("Bail conditions not found"))
        }

        return res.status(200).json(successResponse(bailConditions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}

export const createBailConditions = async (req: Request, res: Response) => {

    try {
        const result = createBailConditionSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const bailConditions = await createBailConditionsService(result.data)

        return res.status(201).json(successResponse(bailConditions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const updateBailConditions = async (req: Request, res: Response) => {

    try {
        const result = updateBailConditionSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const bailConditions = await updateBailConditionsService(req.params.id as string, result.data)

        return res.status(200).json(successResponse(bailConditions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const deleteBailConditions = async(req: Request, res: Response) => {

    try {
        
        await deleteBailConditionsService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}