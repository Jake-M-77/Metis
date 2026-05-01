import type { Request, Response } from "express";
import { createCommService, deleteCommsService, getAllCommsService, getCommsByIdService, updateCommService } from "../services/comms.service.js";
import { errorResponse, successResponse } from "../utils/ApiResponse.js";
import { createCommSchema, updateCommSchema } from "../validation/comms.schema.js";


export const getAllComms = async (req: Request, res: Response) => {

    try {

        const comms = await getAllCommsService();


        return res.status(200).json(successResponse(comms));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal Server error"))
    }

}

export const getCommsById = async (req: Request, res: Response) => {

    try {

        const comms = await getCommsByIdService(req.params.id as string);

        if (!comms) {
            return res.status(404).json(errorResponse("Comms not found"));
        }

        return res.status(200).json(successResponse(comms));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}


export const createComms = async (req: Request, res: Response) => {


    try {
        const result = createCommSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const comm = await createCommService(result.data);


        res.status(201).json(successResponse(comm));
    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }




}

export const updateComms = async (req: Request, res: Response) => {


    try {
        const result = updateCommSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json(errorResponse(result.error.message));
        }

        const comm = await updateCommService(req.params.id as string, result.data);

        res.status(200).json(successResponse(comm));
    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))

    }



}

export const deleteComms = async (req: Request, res: Response) => {

    try {

        await deleteCommsService(req.params.id as string);

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}