import type { ApiResponse } from "../types/api";

export const getBatchCustodyImages = async (id: Array<string>): Promise<Record<string, string>> => {

    const personIds = JSON.stringify(id);

    const res = await fetch(`http://localhost:3001/custody-photos/batch`, {
        method: "POST",
        body: personIds,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const json: ApiResponse<Record<string, string>> = await res.json();


    if(!json.success || !json.data) {
        throw new Error(json.error || "Failed to fetch batch custody photos");
    }

    return json.data


}