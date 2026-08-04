

export const getRelationshipCategory = (relationType: string) => {

    if (relationType === "CHILD_OF" || relationType === "PARENT_OF") {
        return "FAMILY";
    }
    else {
        return "UNKNOWN";

    }

}

