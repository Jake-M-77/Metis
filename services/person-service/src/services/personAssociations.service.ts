import { prisma } from "../db/prisma.js"
import type { createPersonAssociationInput, updatePersonAssociationInput } from "../validation/personAssociations.schema.js";

export const getAllPersonAssociationsService = async () => {
    return prisma.personAssociation.findMany()
};

export const getPersonAssociationsByIdService = async (id: string) => {
    return prisma.personAssociation.findUnique({
        where: { id },
    })
}

export const getPersonAssociationsByPersonIdService = async (id: string) => {
    return prisma.personAssociation.findMany({
        where: {
            OR: [
                {sourcePersonId: id},
                {targetPersonId: id}
            ]

        },
    })
}

export const createPersonAssociationsService = async (data: createPersonAssociationInput) => {
    return prisma.personAssociation.create({
        data: {
            sourcePersonId: data.sourcePersonId,
            targetPersonId: data.targetPersonId,
            relationType: data.relationType,
        }
    })
}

export const updatePersonAssociationsService = async (
    id: string,
    data: updatePersonAssociationInput) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.personAssociation.update({
        where: { id },
        data: updatedData
    })
};

export const deletePersonAssociationsService = async (id: string) => {
    return prisma.personAssociation.delete({
        where: { id },
    })
}