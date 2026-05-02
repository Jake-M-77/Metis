import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestPersonAlias from "../helpers/personAlias/create-test-person-alias.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { deleteTestPersonAlias } from "../helpers/personAlias/delete-test-person-alias.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";

describe("Person Alias Endpoints = with auto setup", () => {
    let personId: string;
    let personAliasId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        personAliasId = await createTestPersonAlias(personId);
    })

    afterEach(async () => {
        if (personAliasId) await deleteTestPersonAlias(personAliasId);
        if (personId) await deleteTestPerson(personId);
    })

    // GET BY ID
    it("should return person alias by id", async () => {

        const res = await request(app).get(`/person-aliases/${personAliasId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(personAliasId);
    })

    // UPDATE

    it("should update person alias", async () => {
        const res = await request(app)
        .put(`/person-aliases/${personAliasId}`)
        .send({
            aliasName: "JEST - AUTOSETUP"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.aliasName).toBe("JEST - AUTOSETUP");

    });

});

describe("Person Alias Endpoints - without setup", () => {
    let personId: string;
    let personAliasId: string;

    beforeAll(async () => {
            personId = await createTestPerson();
        })

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should create a person alias", async () => {
        const res = await request(app)
        .post("/person-aliases")
        .send({
            aliasName: "JEST - NO SETUP",
            aliasDob: "01-01-2001 00:00:00.000",
            enteredBy: "JEST - NO SETUP",
            personId: personId,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.aliasName).toBe("JEST - NO SETUP");

        personAliasId = res.body.data.id;
    });

    // DELETE

    it("should delete person alias", async () => {
        const res = await request(app).delete(`/person-aliases/${personAliasId}`);

        expect(res.statusCode).toBe(204);
    });

    // CONFIRM DELETE

    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/person-aliases/${personAliasId}`);

        expect(res.statusCode).toBe(404);
    })

})