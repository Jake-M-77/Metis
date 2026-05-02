import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { createTestComms } from "../helpers/comms/create-test-comms.js";
import { deleteTestComms } from "../helpers/comms/delete-test-comms.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";

describe("Comms Endpoint - with auto setup", () => {

    let personId: string;
    let commsId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        commsId = await createTestComms(personId);
    })

    afterEach(async () => {
        if (commsId) await deleteTestComms(commsId)
        if (personId) await deleteTestPerson(personId)
    })


    // GET BY ID
    it("should return comms by ID", async () => {

        const res = await request(app).get(`/comms/${commsId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(commsId);
    });

    // UPDATE
    it("should update a comms", async () => {
        const res = await request(app)
            .put(`/comms/${commsId}`)
            .send({
                contactValue: "JEST - AUTOSETUP",

            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.contactValue).toBe("JEST - AUTOSETUP")
    });

});

describe("Comms Endpoint - without setup", () => {

    let personId: string;
    let commsId: string;

    beforeAll(async () => {
        personId = await createTestPerson();
    })

    afterAll(async () => {
        if (personId) await deleteTestPerson(personId)
        await prisma.$disconnect();
    });

    it("should create a comms", async () => {
        const res = await request(app)
            .post("/comms")
            .send({
                contactType: "PHONE",
                contactValue: "JEST - NO SETUP",
                personId: personId,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.contactValue).toBe("JEST - NO SETUP");

        commsId = res.body.data.id;
    });

    // DELETE
    it("should delete comms", async () => {
        const res = await request(app).delete(`/comms/${commsId}`);

        expect(res.statusCode).toBe(204);
    })

    // CONFIRM DELETE
    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/comms/${commsId}`);

        expect(res.statusCode).toBe(404);
    })

})