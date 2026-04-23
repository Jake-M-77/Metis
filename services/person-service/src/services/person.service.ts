import { isPrimary } from "node:cluster";
import { prisma } from "../db/prisma.js";

export const getAllPersons = async () => {
    return prisma.person.findMany()
};


export const createPersonService = async (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    ethnicity: string;
    pncId: string;
    sex: string;
}) => {
    return prisma.person.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            ethnicity: data.ethnicity,
            pncId: data.pncId,
            sex: data.sex
        },
    });
};

export const getPersonByIdService = async (id: string) => {
    return prisma.person.findUnique({
        where: { id },
    });
};


export const getPersonActivePhoneNumberService = async (id: string) => {
    return prisma.comms.findFirst({
        where: {
            personId: id,
            contactType: "Phone",
            isPrimary: true
        },
        select: {
            contactValue: true
        }
    })
}

export const getPersonActiveEmailAddressService = async (id: string) => {
    return prisma.comms.findFirst({
        where: {
            personId: id,
            contactType: "Email", 
            isPrimary: true
        },
        select: {
            contactValue: true
        }
    })
}


export const getPersonActiveHomeAddressService = async (pid: string) => {
    const record = await prisma.personAddress.findFirst({
        where: {
            personId: pid,
            relationshipType: "RESIDES"
        },
        include: {
            address: true
        }
    })

    console.log(record);
    return record?.address
    
}



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
            ...(data.birthDate && { birthDate: new Date(data.birthDate) }),
        },
    });
};

export const deletePersonService = async (id: string) => {
    return prisma.person.delete({
        where: { id },
    });
};

export const getPersonByFirstNameService = async (firstName: string) => {

    return await prisma.person.findMany({
        where: {
            firstName: {
                contains: firstName,
                mode: "insensitive",
            },
        },
    });
};