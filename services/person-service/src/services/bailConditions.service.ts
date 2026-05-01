import { prisma } from "../db/prisma.js"
import type { createBailConditionInput, updateBailConditionInput } from "../validation/bailConditions.schema.js";



export const getAllBailConditionsService = async () => {
    return prisma.bailCondition.findMany()
};

export const getBailConditionsByIdService = async (id: string) => {
    return prisma.bailCondition.findUnique({
        where: { id },
    });
};

export const createBailConditionsService = async (data: createBailConditionInput) => {
    return prisma.bailCondition.create({
        data: {
            conditionType: data.conditionType,
            endDate: data.endDate ?? null,
            imposedBy: data.imposedBy,
            description: data.description,
            personId: data.personId
        }
    })
};

export const updateBailConditionsService = async (
    id: string,
    data: updateBailConditionInput
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.bailCondition.update({
        where: { id },
        data: updatedData
    })

};

export const deleteBailConditionsService = async (id: string) => {
    return prisma.bailCondition.delete({
        where: { id },
    });
};