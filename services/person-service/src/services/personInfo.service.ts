import { prisma } from "../db/prisma.js"
import type { createPersonInfoInput, updatePersonInfoInput } from "../validation/personInfo.schema.js";


export const getAllPersonInfosService = async () => {
    return prisma.personInfo.findMany()
};

export const getPersonInfosByIdService = async (id: string) => {
    return prisma.personInfo.findUnique({
        where: { id },
    });
};

export const createPersonInfosService = async (data: createPersonInfoInput) => {
    return prisma.personInfo.create({
        data: {

            recordCreatedBy: data.recordCreatedBy,
            sourceSystem: data.sourceSystem,
            lastModifiedBy: data.lastModifiedBy,
            lastModifiedDate: data.lastModifiedDate,
            changeNotes: data.changeNotes ?? null,
            personId: data.personId,
        }
    })
};

export const updatePersonInfosService = async (
    id: string,
    data: updatePersonInfoInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.personInfo.update({
        where: { id },
        data: updatedData
    })

};

export const deletePersonInfosService = async (id: string) => {
    return prisma.personInfo.delete({
        where: { id },
    });
};