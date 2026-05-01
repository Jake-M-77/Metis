import { prisma } from "../db/prisma.js"
import type { createPersonDescriptionInput, updatePersonDescriptionInput } from "../validation/personDescriptions.schema.js";



export const getAllPersonDescriptionsService = async () => {
    return prisma.personDescription.findMany()
};

export const getPersonDescriptionsByIdService = async (id: string) => {
    return prisma.personDescription.findUnique({
        where: { id },
    });
};

export const createPersonDescriptionsService = async (data: createPersonDescriptionInput) => {
    return prisma.personDescription.create({
        data: {

            descriptorType: data.descriptorType,
            description: data.description,
            imageURL: data.imageURL,
            enteredBy: data.enteredBy,
            updatedAt: data.updatedAt,
            personId: data.personId,
        }
    })
};

export const updatePersonDescriptionsService = async (
    id: string,
    data: updatePersonDescriptionInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.personDescription.update({
        where: { id },
        data: updatedData
    })

};

export const deletePersonDescriptionsService = async (id: string) => {
    return prisma.personDescription.delete({
        where: { id },
    });
};