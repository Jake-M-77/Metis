import type { PersonAssociationWithRelations } from "../utils/PersonAssociationsWithRelations.js";
import { inverseRelation } from "../utils/relationMap.js";


export const resolvePersonAssociations = (data: Array<PersonAssociationWithRelations>, id: string) => {
    return data.map((personAssociation) => {

        const sourcePersonId = personAssociation.sourcePersonId;
        const targetPersonId = personAssociation.targetPersonId;

        if (sourcePersonId === id) {
            return {
                person: personAssociation.targetPerson,
                relationType: personAssociation.relationType,
                direction: "OUTGOING"
            }
        }
        else if (targetPersonId === id) {

            const relationType = personAssociation.relationType
            return {
                person: personAssociation.sourcePerson,
                relationType: inverseRelation[relationType],
                direction: "INCOMING"
            }

        }

    })
}

export default resolvePersonAssociations;