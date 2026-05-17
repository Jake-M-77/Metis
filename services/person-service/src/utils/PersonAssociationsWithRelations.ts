import type { Person, PersonAssociation } from "../generated/prisma/index.js";

export type PersonAssociationWithRelations = PersonAssociation & {
    sourcePerson: Person;
    targetPerson: Person;
}
