import { prisma } from "../db/prisma.js"
import type { createWarningMarkerInput, updateWarningMarkerInput } from "../validation/warningMarkers.schema.js";

export const getAllWarningMarkersService = async () => {
    return prisma.warningMarker.findMany()
};

export const getWarningMarkersByIdService = async (id: string) => {
    return prisma.warningMarker.findUnique({
        where: { id },
    });
};

export const createWarningMarkersService = async (data: createWarningMarkerInput) => {
    return prisma.warningMarker.create({
        data: {
            markerType: data.markerType,
            description: data.description,
            enteredBy: data.enteredBy,
            personId: data.personId
        }
    })
};

export const updateWarningMarkersService = async (
    id: string,
    data: updateWarningMarkerInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.warningMarker.update({
        where: { id },
        data: updatedData
    })

};

export const deleteWarningMarkersService = async (id: string) => {
    return prisma.warningMarker.delete({
        where: { id },
    });
};