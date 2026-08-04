import type { PersonAssociationWithRelations } from "../utils/PersonAssociationsWithRelations.js";
import { inverseRelation } from "../utils/relationMap.js";
import { getRelationshipCategory } from "./resolveRelationshipCategory.js";


export const resolvePersonAssociations = (data: Array<PersonAssociationWithRelations>, id: string) => {
    return data.map((personAssociation) => {

        const sourcePersonId = personAssociation.sourcePersonId;
        const targetPersonId = personAssociation.targetPersonId;



        if (sourcePersonId === id) {
            const relationshipCategory = getRelationshipCategory(personAssociation.relationType);

            return {
                person: personAssociation.targetPerson,
                relationType: personAssociation.relationType,
                relationshipCategory,
                direction: "OUTGOING"
            }
        }
        else if (targetPersonId === id) {

            const relationType = inverseRelation[personAssociation.relationType]

            const relationshipCategory = getRelationshipCategory(relationType)
            return {
                person: personAssociation.sourcePerson,
                relationType,
                relationshipCategory,
                direction: "INCOMING"
            }

        }

    })
}

export default resolvePersonAssociations;