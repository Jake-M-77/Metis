import { PersonAssociation } from "../types/personAssociation";


export function groupPersonAssociations (passedData: Array<PersonAssociation>){

    const data: Record<string, PersonAssociation[]> = {};

    console.log()
    passedData.forEach(x => {
        if (!Object.hasOwn(data, x.relationshipCategory)) {
            const z = x.relationshipCategory;
            data[x.relationshipCategory] = [x];
            // data[x.relationshipCategory] = [x];
        }
        else
        {
            console.log("xqqq");
            data[x.relationshipCategory] = [...data[x.relationshipCategory], x]
        }
        
    });

    console.log(data);

}