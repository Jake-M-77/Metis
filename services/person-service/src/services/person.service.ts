import { prisma } from "../db/prisma.js";

export const getAllPersons = async () => {
    return prisma.person.findMany()
};


export const createPersonService = async (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
}) => {
    return prisma.person.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate
        },
    });
};

export const getPersonByIdService = async (id: string) => {
    return prisma.person.findUnique({
        where: { id },
    });
};

export const updatePersonService = async (
    id: string, 
    data: Partial<{
        firstName: string;
        lastName: string;
        birthDate: string;
    }>
) => {
    return prisma.person.update({
        where: { id },
        data: {
            ...data,
            ...(data.birthDate && { birthDate : new Date(data.birthDate)}),
        },
    });
};

export const deletePersonService = async (id: string) => {
    return prisma.person.delete({ where: { id },
    });
};