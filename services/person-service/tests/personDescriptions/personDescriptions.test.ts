import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import createTestPersonDescription from "../helpers/personDescriptions/create-test-person-description.js";
import { deleteTestPersonDescription } from "../helpers/personDescriptions/delete-test-person-description.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";

describe("Person Description Endpoint - with auto setup", () => {
    let personId: string;
    let personDescriptionId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        personDescriptionId = await createTestPersonDescription(personId);
    })

    afterEach(async () => {
        if (personDescriptionId) await deleteTestPersonDescription(personDescriptionId);
        if (personId) await deleteTestPerson(personId);
    })

    // GET BY ID
    it("should return person description by id", async () => {
        const res = await request(app).get(`/person-descriptions/${personDescriptionId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(personDescriptionId);
    });

    // UPDATE

    it("should update person description", async () => {
        const res = await request(app)
            .put(`/person-descriptions/${personDescriptionId}`)
            .send({
                description: "JEST - AUTOSETUP"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.description).toBe("JEST - AUTOSETUP");
    });

});

describe("Person Descriptions Endpoints - without setup", () => {
    let personId: string;
    let personDescriptionId: string;

    beforeAll(async () => {
        personId = await createTestPerson()
    })


    afterAll(async () => {
        if (personId) await deleteTestPerson(personId)
        await prisma.$disconnect();
    });

    it("should create a person description", async () => {
        const res = await request(app)
            .post("/person-descriptions")
            .send({
                descriptorType: "IDENTIFIER",
                description: "JEST - NO SETUP",
                imageURL: "JEST - NO SETUP",
                enteredBy: "JEST - NO SETUP",
                updatedAt: "2026-05-02 00:00:00.000",
                personId: personId,
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.id).toBeDefined();
            expect(res.body.data.description).toBe("JEST - NO SETUP");

            personDescriptionId = res.body.data.id;
    });

    // DELETE

    it("should delete person description", async () => {
        const res = await request(app).delete(`/person-descriptions/${personDescriptionId}`);

        expect(res.statusCode).toBe(204);
    })

    // CONFIRM DELETE

    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/person-descriptions/${personDescriptionId}`);

        expect(res.statusCode).toBe(404);
        
    })

})