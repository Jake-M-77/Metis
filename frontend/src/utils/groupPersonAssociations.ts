import { PersonAssociation } from "../types/personAssociation";


export function groupPersonAssociations(passedData: Array<PersonAssociation>) {

    const groupedData: Record<string, PersonAssociation[]> = {};

    passedData.forEach(x => {
        if (!Object.hasOwn(groupedData, x.relationshipCategory)) {
            groupedData[x.relationshipCategory] = [x];
        }
        else {
            groupedData[x.relationshipCategory] = [...groupedData[x.relationshipCategory], x]
        }

    });

    console.log(groupedData);

    return groupedData;

}