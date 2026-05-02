import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestPersonInfo from "../helpers/personInfo/create-test-person-info.js";
import { deleteTestPersonInfo } from "../helpers/personInfo/delete-test-person-info.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";

describe("Person Info Endpoints - with auto setup", () => {

    let personId: string;
        let personInfoId: string;
    
        afterAll(async () => {
            await prisma.$disconnect();
        });
    
        beforeEach(async () => {
            personId = await createTestPerson();
            personInfoId = await createTestPersonInfo(personId);
        })
    
        afterEach(async () => {
            if (personInfoId) await deleteTestPersonInfo(personInfoId)
            if (personId) await deleteTestPerson(personId)
        })


    // GET BY ID
    it("should return person info by id", async () => {
        const res = await request(app).get(`/person-info/${personInfoId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(personInfoId);
    })

    // UPDATE
    it("should update person info by id", async () => {
        const res = await request(app)
        .put(`/person-info/${personInfoId}`)
        .send({
            lastModifiedBy: "JEST - AUTOSETUP",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.lastModifiedBy).toBe("JEST - AUTOSETUP");
    });

});

describe("Person Info Endpoints - without setup", () => {

    let personId: string;
        let personInfoId: string;
    
        beforeAll(async () => {
            personId = await createTestPerson();
        })
    
        afterAll(async () => {
            if (personId) await deleteTestPerson(personId)
            await prisma.$disconnect();
        });

    it("should create a person info", async() => {
        const res = await request(app)
        .post("/person-info")
        .send({
            recordCreatedBy: "JEST - NO SETUP",
            sourceSystem: "METIS",
            lastModifiedBy: "JEST - NO SETUP",
            lastModifiedDate: "2026-05-02 00:00:00.000",
            personId: personId,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.lastModifiedBy).toBe("JEST - NO SETUP");

        personInfoId = res.body.data.id;
    })

    // DELETE

    it("should delete person info", async () => {
        const res = await request(app).delete(`/person-info/${personInfoId}`);

        expect(res.statusCode).toBe(204);
    })

    // CONFIRM DELETE
        it("should return 404 after deletion", async () => {
            const res = await request(app).get(`/person-info/${personInfoId}`);
    
            expect(res.statusCode).toBe(404);
        })
})