import { object } from "zod";
import { prisma } from "../db/prisma.js";
import type { CreateCommInput, updateCommInput } from "../validation/comms.schema.js";


export const getAllCommsService = async () => {
    return prisma.comms.findMany()
};


export const getCommsByIdService = async (id: string) => {
    return prisma.comms.findUnique({
        where: { id },
    });
};


export const deleteCommsService = async (id: string) => {
    return prisma.comms.delete({
        where: { id },
    });
};

export const createCommService = async (data: CreateCommInput) => {
    return prisma.comms.create({
        data: {
            contactType: data.contactType,
            contactValue: data.contactValue,
            isPrimary: data.isPrimary,
            personId: data.personId
        }
    })
}

export const updateCommService = async (
    id: string,
    data: updateCommInput
) => {
    
    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.comms.update({
        where: { id },
        data: updatedData 
    })
}