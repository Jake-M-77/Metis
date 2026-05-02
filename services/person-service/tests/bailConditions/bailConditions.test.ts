import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../src/utils/ApiResponse.js";
import { createTestPerson } from "../helpers/person/create-test-user.js"
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";
import createTestBailCondition from "../helpers/bailConditions/create-test-bail-conditon.js";
import { deleteTestBailCondition } from "../helpers/bailConditions/delete-test-bail-condition.js";

describe("Bail Conditions Endpoint - with auto setup", () => {
    let personId: string;
    let bailConditonId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        bailConditonId = await createTestBailCondition(personId);
    })

    afterEach(async () => {
        if (bailConditonId) await deleteTestBailCondition(bailConditonId)
        if (personId) await deleteTestPerson(personId)
    })

    // GET BY ID
    it("should return bail condition by id", async () => {
        const res = await request(app).get(`/bail-conditions/${bailConditonId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(bailConditonId);
    })

    // UPDATE
    it("should update a bail condition", async () => {
        const res = await request(app)
            .put(`/bail-conditions/${bailConditonId}`)
            .send({
                description: "JEST - AUTOSETUP",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.description).toBe("JEST - AUTOSETUP");
    });

});

describe("Bail Conditions Endpoints - without setup", () => {

    let personId: string;
    let bailConditionId: string;

    beforeAll(async () => {
        personId = await createTestPerson();
    })

    afterAll(async () => {
        if (personId) await deleteTestPerson(personId)
        await prisma.$disconnect();
    });

    

    it("should create a bail condition", async () => {
        const res = await request(app)
            .post("/bail-conditions")
            .send({
                conditionType: "OTHER",
                imposedBy: "JEST - NO SETUP",
                description: "JEST - NO SETUP",
                personId: personId,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.description).toBe("JEST - NO SETUP");

        bailConditionId = res.body.data.id;
    });

    // DELETE
    it("should delete bail condition", async () => {
        const res = await request(app).delete(`/bail-conditions/${bailConditionId}`);

        expect(res.statusCode).toBe(204);
    })

    // CONFIRM DELETE
    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/bail-conditions/${bailConditionId}`);

        expect(res.statusCode).toBe(404);
    })
})