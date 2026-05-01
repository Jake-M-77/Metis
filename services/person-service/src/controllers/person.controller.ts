import type { Request, Response } from "express";
import { getAllPersons, createPersonService, getPersonByIdService, updatePersonService, deletePersonService, getPersonByFirstNameService, getPersonActivePhoneNumberService, getPersonActiveEmailAddressService, getPersonActiveHomeAddressService, getPersonWarningMarkersService, getPersonBailConditionsService, getPersonDescriptionsService, getPersonAliasesService, getPersonCustodyPhotosService, getPersonDocumentsService } from "../services/person.service.js";
import { errorResponse, successResponse } from "../utils/ApiResponse.js";
import { createPersonSchema, updatePersonSchema } from "../validation/person.schema.js";

// export const getPersons = async (reg: Request, res: Response) => {
//     res.json({ message: "Controller is working" })
// }


export const getPersons = async (req: Request, res: Response) => {
    const persons = await getAllPersons()
    res.json(persons)
}

export const createPerson = async (req: Request, res: Response) => {

    const result = createPersonSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(errorResponse(result.error.message));
    }


    const person = await createPersonService(result.data);
    
    res.status(201).json(successResponse(person));
}

export const updatePerson = async (req: Request, res: Response) => {

    const result = updatePersonSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(errorResponse(result.error.message));
    }

    const updatedPerson = await updatePersonService(req.params.id as string, result.data);

    return res.status(200).json(successResponse(updatedPerson));
}

export const deletePerson = async (req: Request, res: Response) => {
    await deletePersonService(req.params.id as string);
    res.status(204).send(); // change this later
};


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

    try {
        const warningMarkers = await getPersonWarningMarkersService(req.params.id as string);

        if(warningMarkers == null) {
            return res.status(404).json(errorResponse("No warning markers found!"));
        }

        return res.status(200).json(successResponse(warningMarkers));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"));
    }

}

export const getPersonBailConditions = async(req: Request, res: Response) => {

    try{
        const bailConditions = await getPersonBailConditionsService(req.params.id as string);

        if(bailConditions == null) {
            return res.status(404).json(errorResponse("No bail conditions found!"));
        }

        return res.status(200).json(successResponse(bailConditions));
    } catch(error){
        return res.status(500).json(errorResponse("Internal server error"));
    }

}


export const getPersonDescriptions = async(req: Request, res: Response) => {

    try {
        
        const personDescriptions = await getPersonDescriptionsService(req.params.id as string);

        if(personDescriptions == null) {
            return res.status(404).json(errorResponse("No person descriptions found!"))
        }

        return res.status(200).json(successResponse(personDescriptions));

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }
}


export const getPersonAliases = async(req: Request, res: Response) => {

    try {
        const aliases = await getPersonAliasesService(req.params.id as string);

        if(aliases == null) {
            return res.status(404).json(errorResponse("No person aliases found!"))
        }

        return res.status(200).json(successResponse(aliases))

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }


}

export const getPersonCustodyPhotos = async (req: Request, res: Response) => {

    try {
        
        const custodyPhotos = await getPersonCustodyPhotosService(req.params.id as string);

        if(custodyPhotos == null) {
            return res.status(404).json(errorResponse("No custody photos found!"))
        }

        return res.status(200).json(successResponse(custodyPhotos))

    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}

export const getPersonDocuments = async (req: Request, res: Response) => {

    try{
        
        const documents = await getPersonDocumentsService(req.params.id as string);

        if(documents.length == 0) {
            return res.status(404).json(errorResponse("No person documents found!"))
        }

        return res.status(200).json(successResponse(documents))
    } catch (error) {
        return res.status(500).json(errorResponse("Internal server error"))
    }

}





export const getPersonByFirstName = async (req: Request, res: Response) => {

    const { firstName } = req.query;

    console.log("Hit search endpoint")

    const persons = await getPersonByFirstNameService(firstName as string);

    if (persons.length === 0){
        return res.status(404).json( { message: "Person(s) not found" })
    }

    res.json(persons);
};