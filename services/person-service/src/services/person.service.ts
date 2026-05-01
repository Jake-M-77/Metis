import { prisma } from "../db/prisma.js";
import type { CreatePersonInput, updatePersonInput } from "../validation/person.schema.js";

export const getAllPersons = async () => {
    return prisma.person.findMany()
};


export const createPersonService = async (data: CreatePersonInput) => {
    return prisma.person.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            ethnicity: data.ethnicity,
            pncId: data.pncId ?? null,
            sex: data.sex
        },
    });
};

export const updatePersonService = async (
    id: string,
    data: updatePersonInput

    
) => {

    const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    return prisma.person.update({
        where: { id },
        data: updatedData
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


export const getPersonWarningMarkersService = async (pid: string) => {
    const warningMarkers = await prisma.warningMarker.findMany({
        where: {
            personId: pid
         },
    });

    return warningMarkers;
}

export const getPersonBailConditionsService = async (pid: string) => {
    const bailConditions = await prisma.bailCondition.findMany({
        where: {
            personId: pid
        },
    });

    return bailConditions;
}

export const getPersonDescriptionsService = async (pid: string) => {
    const personDescriptions = await prisma.personDescription.findMany({
        where: {
            personId: pid
        },
    });

    return personDescriptions;
}

export const getPersonAliasesService = async (pid: string) => {
    const aliases = await prisma.personAlias.findMany({
        where: {
            personId: pid
        },
    });

    return aliases;
}

export const getPersonCustodyPhotosService = async (pid: string) => {
    const custodyPhotos = await prisma.custodyPhoto.findMany({
        where: {
            personId: pid
        },
    });

    return custodyPhotos;
}

export const getPersonDocumentsService = async (pid: string) => {
    const documents = await prisma.document.findMany({
        where: {
            personId: pid
        },
    });

    return documents;
}




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