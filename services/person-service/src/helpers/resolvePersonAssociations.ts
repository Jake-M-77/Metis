import type { PersonAssociationWithRelations } from "../utils/PersonAssociationsWithRelations.js";
import { inverseRelation } from "../utils/relationMap.js";


export const resolvePersonAssociations = (data: Array<PersonAssociationWithRelations>, id: string) => {
    return data.map((personAssociation) => {

        const sourcePersonId = personAssociation.sourcePersonId;
        const targetPersonId = personAssociation.targetPersonId;

        let relationshipCategory = "";

        if (personAssociation.relationType === "CHILD_OF" || personAssociation.relationType === "PARENT_OF") {
            relationshipCategory = "FAMILY"
        }


        if (sourcePersonId === id) {
            return {
                person: personAssociation.targetPerson,
                relationType: personAssociation.relationType,
                relationshipCategory: relationshipCategory,
                direction: "OUTGOING"
            }
        }
        else if (targetPersonId === id) {

            const relationType = personAssociation.relationType
            return {
                person: personAssociation.sourcePerson,
                relationType: inverseRelation[relationType],
                relationshipCategory: relationshipCategory,
                direction: "INCOMING"
            }

        }

    })
}

export default resolvePersonAssociations;