import type { Request, Response } from "express";
import { getAllPersons, createPersonService, getPersonByIdService, updatePersonService, deletePersonService } from "../services/person.service.js";

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
    const person = await getPersonByIdService(req.params.id as string);

    if (!person) {
        return res.status(404).json( { message: "Person not found" })
    }

    res.json(person)
}

export const updatePerson = async (req: Request, res: Response) => {
    const person = await updatePersonService(req.params.id as string, req.body);
    res.json(person);
}

export const deletePerson = async (req: Request, res: Response) => {
    await deletePersonService(req.params.id as string);
    res.status(204).send();
};