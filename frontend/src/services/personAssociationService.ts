import type { ApiResponse } from "../types/api";
import type { PersonAssociation } from "../types/personAssociation";


export const getPersonAssociations = async (id: string): Promise<PersonAssociation[]> => {
    const res = await fetch(`http://localhost:3001/person-associations/pid/${id}`);

    const json: ApiResponse<PersonAssociation[]> = await res.json();

    if(!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch person assocations");
    }

    return json.data
}