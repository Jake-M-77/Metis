import type { Address } from "../types/address";
import type { ApiResponse } from "../types/api";
import type { BailCondition } from "../types/bailCondition";
import type { CustodyPhoto } from "../types/custodyPhoto";
import type { Person } from "../types/person";
import type { PersonAlias } from "../types/personAlias";
import type { PersonDescriptions } from "../types/personDescriptions";
import type { PersonDocuments } from "../types/personDocuments";
import type { WarningMarker } from "../types/warningMarker";

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

export const getPersonWarningMarkers = async (id: string): Promise<WarningMarker[]> => {
    const res = await fetch(`http://localhost:3001/persons/${id}/warning-markers`)

    const json: ApiResponse<WarningMarker[]> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch warning markers");
    }

    return json.data;
}

export const getPersonBailConditions = async (id: string): Promise<BailCondition[]> => {
    const res = await fetch(`http://localhost:3001/persons/${id}/bail-conditions`)

    const json: ApiResponse<BailCondition[]> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch bail conditons");
    }

    return json.data;
}

export const getPersonDescriptions = async (id: string): Promise<PersonDescriptions[]> => {
    const res = await fetch(`http://localhost:3001/persons/${id}/descriptions`)

    const json: ApiResponse<PersonDescriptions[]> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch person descriptions!")
    }

    return json.data;
}

export const getPersonAliases = async (id: string): Promise<PersonAlias[]> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/aliases`)

    const json: ApiResponse<PersonAlias[]> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch person aliases")
    }

    return json.data;

}

export const getPersonCustodyPhotos = async (id: string): Promise<CustodyPhoto[]> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/custody-photos`)

    const json: ApiResponse<CustodyPhoto[]> = await res.json();

    if(!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch custody photos")
    }

    return json.data;

}

export const getPersonDocuments = async (id: string): Promise<PersonDocuments[]> => {

    const res = await fetch(`http://localhost:3001/persons/${id}/documents`)

    const json: ApiResponse<PersonDocuments[]> = await res.json();

    if(!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch person documents")
    }

    return json.data

}