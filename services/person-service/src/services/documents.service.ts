import { prisma } from "../db/prisma.js"
import type { createDocumentInput, updateDocumentInput } from "../validation/document.schema.js";


export const getAllDocumentsService = async () => {
    return prisma.document.findMany()
};

export const getDocumentsByIdService = async (id: string) => {
    return prisma.document.findUnique({
        where: { id },
    });
};

export const createDocumentsService = async (data: createDocumentInput) => {
    return prisma.document.create({
        data: {

            documentType: data.documentType,
            fileName: data.fileName,
            fileUrl: data.fileUrl,
            uploadedBy: data.uploadedBy,
            uploadDate: data.uploadDate,
            expiryDate: data.expiryDate ?? null,
            notes: data.notes ?? null,
            personId: data.personId
        }
    })
};

export const updateDocumentsService = async (
    id: string,
    data: updateDocumentInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.document.update({
        where: { id },
        data: updatedData
    })

};

export const deleteDocumentsService = async (id: string) => {
    return prisma.document.delete({
        where: { id },
    });
};