import { prisma } from "../db/prisma.js"
import type { createPersonAliasInput, updatePersonAliasInput } from "../validation/personAliases.schema.js";



export const getAllPersonAliasesService = async () => {
    return prisma.personAlias.findMany()
};

export const getPersonAliasesByIdService = async (id: string) => {
    return prisma.personAlias.findUnique({
        where: { id },
    });
};

export const createPersonAliasesService = async (data: createPersonAliasInput) => {
    return prisma.personAlias.create({
        data: {

            aliasName: data.aliasName,
            aliasDob: data.aliasDob ?? null,
            notes: data.notes ?? null,
            enteredBy: data.enteredBy,
            personId: data.personId,
        }
    })
};

export const updatePersonAliasesService = async (
    id: string,
    data: updatePersonAliasInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.personAlias.update({
        where: { id },
        data: updatedData
    })

};

export const deletePersonAliasesService = async (id: string) => {
    return prisma.personAlias.delete({
        where: { id },
    });
};