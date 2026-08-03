import { PersonAssociation } from "../../types/personAssociation";
import { groupPersonAssociations } from "../groupPersonAssociations";

describe("groupPersonAssociation helper", () => {

    it("should test the outcome that is provided by arr1", async () => {

        const arr1: PersonAssociation[] = [];

        const obj1: PersonAssociation = {
            person: {
                id: "123",
                firstName: "John",
                lastName: "Smith",
                birthDate: new Date("1912-06-23T00:00:00.000Z"),
                createdAt: new Date("2026-05-15T00:00:00.000Z"),
                ethnicity: "White",
                pncId: "000000",
                sex: "Male",
            },
            relationType: "UNKNOWN",
            direction: "INCOMING",
            relationshipCategory: "UNKNOWN"
        }

        const obj2: PersonAssociation = {
            person: {
                id: "123",
                firstName: "Adam",
                lastName: "Doe",
                birthDate: new Date("1912-06-23T00:00:00.000Z"),
                createdAt: new Date("2026-05-15T00:00:00.000Z"),
                ethnicity: "White",
                pncId: "000000",
                sex: "Male",
            },
            relationType: "UNKNOWN",
            direction: "INCOMING",
            relationshipCategory: "UNKNOWN"
        }

        arr1.push(obj1);
        arr1.push(obj2);

        const groupResult = groupPersonAssociations(arr1)

        expect(groupResult).toHaveProperty("UNKNOWN");

    });

    it("should test the outcome that is provided by arr2", async () => {

        const obj3: PersonAssociation = {
            person: {
                id: "123",
                firstName: "Oliver",
                lastName: "Queen",
                birthDate: new Date("1912-06-23T00:00:00.000Z"),
                createdAt: new Date("2026-05-15T00:00:00.000Z"),
                ethnicity: "White",
                pncId: "000000",
                sex: "Male",
            },
            relationType: "CHILD_OF",
            direction: "INCOMING",
            relationshipCategory: "FAMILY"
        }

        const obj4: PersonAssociation = {
            person: {
                id: "123",
                firstName: "Thea",
                lastName: "Queen",
                birthDate: new Date("1912-06-23T00:00:00.000Z"),
                createdAt: new Date("2026-05-15T00:00:00.000Z"),
                ethnicity: "White",
                pncId: "000000",
                sex: "Male",
            },
            relationType: "UNKNOWN",
            direction: "INCOMING",
            relationshipCategory: "UNKNOWN"
        }

        const arr2: PersonAssociation[] = [];

        arr2.push(obj3);
        arr2.push(obj4);

        const groupResult = groupPersonAssociations(arr2);

        expect(groupResult).toHaveProperty("FAMILY");
        expect(groupResult).toHaveProperty("UNKNOWN");

    });

    it("should test the outcome that is provided by arr3", async () => {

        const arr3: PersonAssociation[] = [];
        const groupResult = groupPersonAssociations(arr3)

        expect(groupResult).toBeDefined();

    })



})


