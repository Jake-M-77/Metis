import type { Request, Response } from "express";
import { getAllPersons, createPersonService, getPersonByIdService, updatePersonService, deletePersonService, getPersonByFirstNameService, getPersonActivePhoneNumberService, getPersonActiveEmailAddressService, getPersonActiveHomeAddressService } from "../services/person.service.js";
import { errorResponse, successResponse } from "../utils/ApiResponse.js";

// export const getPersons = async (reg: Request, res: Response) => {
//     res.json({ message: "Controller is working" })
// }


export const getPersons = async (req: Request, res: Response) => {
    const persons = await getAllPersons()
    res.json(persons)
}

export const createPerson = async (req: Request, res: Response) => {
    const person = await createPersonService(req.body);
    res.status(201).json(person);
}

export const getPersonById = async (req: Request, res: Response) => {
    try{
        const person = await getPersonByIdService(req.params.id as string);


        if(!person) {
            return res.status(404).json(errorResponse("Person not found"));
        }

        return res.status(200).json(successResponse(person));
    }
    catch(err){
        return res.status(500).json(errorResponse("Internal server error"))
    }
}


export const getPersonActivePhoneNumber = async (req: Request, res: Response) => {

    try {
        const activePhoneNumber = await getPersonActivePhoneNumberService(req.params.id as string);

        if(!activePhoneNumber){
            return res.status(404).json(errorResponse("Active number not found!"));
        }

        return res.status(200).json(successResponse(activePhoneNumber));

    } catch (err) {
        return res.status(500).json(errorResponse("Internal server error"));
    }
}

export const getPersonActiveEmailAddress = async (req: Request, res: Response) => {
    try {
        const activeEmailAddress = await getPersonActiveEmailAddressService(req.params.id as string);

        if(!activeEmailAddress){
            return res.status(404).json(errorResponse("Active Email not found!"));
        }

        return res.status(200).json(successResponse(activeEmailAddress));

    } catch (err) {
        return res.status(500).json(errorResponse("Internal server error"));
    }
}

export const getPersonActiveHomeAddress = async (req: Request, res: Response) => {
    try {
        const activeHomeAddress = await getPersonActiveHomeAddressService(req.params.id as string);

        if(!activeHomeAddress){
            return res.status(404).json(errorResponse("Active Home Address not found!"));
        }

        return res.status(200).json(successResponse(activeHomeAddress));

    } catch (err) {
        return res.status(500).json(errorResponse("Internal server error"));
    }
}


export const getPersonWarningMarkers = async (req: Request, res: Response) => {

}

export const updatePerson = async (req: Request, res: Response) => {
    const person = await updatePersonService(req.params.id as string, req.body);
    res.json(person);
}

export const deletePerson = async (req: Request, res: Response) => {
    await deletePersonService(req.params.id as string);
    res.status(204).send();
};


export const getPersonByFirstName = async (req: Request, res: Response) => {

    const { firstName } = req.query;

    console.log("Hit search endpoint")

    const persons = await getPersonByFirstNameService(firstName as string);

    if (persons.length === 0){
        return res.status(404).json( { message: "Person(s) not found" })
    }

    res.json(persons);
};