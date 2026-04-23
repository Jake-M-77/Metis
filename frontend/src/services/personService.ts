import type { Address } from "../types/address";
import type { ApiResponse } from "../types/api";
import type { Person } from "../types/person";

export const getPersonById = async (id: string): Promise<Person> => {

    const res = await fetch(`http://localhost:3001/persons/${id}`);

    const json: ApiResponse<Person> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch person");
    }

    return json.data;

}


export const transformPersonData = async (id: string): Promise<Person> => {

    const person = await getPersonById(id);



    const mappedData: Person = {
        ...person,
        birthDate: person.birthDate ? new Date(person.birthDate) : null
    };

    return (mappedData);



}


export const getPersonActivePhoneNumber = async (id: string): Promise<string> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/active/number`);

    const json: ApiResponse<string> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch active phone number");
    }

    return json.data;

}

export const getPersonActiveEmailAddress = async (id: string): Promise<string> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/active/email`)

    const json: ApiResponse<string> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch active email address");
    }

    return json.data;

}

export const getPersonActiveHomeAddress = async (id: string): Promise<Address> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/active/address`)

    const json: ApiResponse<Address> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch active home address");
    }

    return json.data;

}