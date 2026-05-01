import { prisma } from "../db/prisma.js"
import type { createCustodyPhotoInput, updateCustodyPhotoInput } from "../validation/custodyPhotos.schema.js";

export const getAllCustodyPhotosService = async () => {
    return prisma.custodyPhoto.findMany()
};

export const getCustodyPhotosByIdService = async (id: string) => {
    return prisma.custodyPhoto.findUnique({
        where: { id },
    });
};

export const createCustodyPhotosService = async (data: createCustodyPhotoInput) => {
    return prisma.custodyPhoto.create({
        data: {

            imageUrl: data.imageUrl,
            dateTaken: data.dateTaken ?? null,
            uploadedBy: data.uploadedBy,
            notes: data.notes ?? null,
            personId: data.personId,
        }
    })
};

export const updateCustodyPhotosService = async (
    id: string,
    data: updateCustodyPhotoInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.custodyPhoto.update({
        where: { id },
        data: updatedData
    })

};

export const deleteCustodyPhotosService = async (id: string) => {
    return prisma.custodyPhoto.delete({
        where: { id },
    });
};