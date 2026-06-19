

export type PersonAssociation = {
    person: {
        id: string;
        firstName: string;
        lastName: string;
        birthDate: Date | null;
        createdAt: Date;
        ethnicity: string;
        pncId: string;
        sex: string;
    }
    relationType: string;
    direction: string;
}