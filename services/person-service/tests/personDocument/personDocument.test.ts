import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";
import createTestPersonDocument from "../helpers/personDocuments/create-test-person-document.js";
import { deleteTestPersonDocument } from "../helpers/personDocuments/delete-test-person-document.js";

describe("Person Documents Endpoint - with auto setup", () => {

    let personId: string;
    let personDocumentId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        personDocumentId = await createTestPersonDocument(personId);
    })

    afterEach(async () => {
        if (personDocumentId) await deleteTestPersonDocument(personDocumentId)
        if (personId) await deleteTestPerson(personId)
    })

    // GET BY ID
    it("should return person document by id", async () => {
        const res = await request(app).get(`/documents/${personDocumentId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(personDocumentId);
    });

    // UPDATE
    it("should update a person document", async () => {
        const res = await request(app)
            .put(`/documents/${personDocumentId}`)
            .send({
                fileName: "JEST - AUTOSETUP"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.fileName).toBe("JEST - AUTOSETUP");
    });

});

describe("Person Documents Endpoint - without setup", () => {

    let personId: string;
    let personDocumentId: string;

    beforeAll(async () => {
            personId = await createTestPerson();
        })
    
        afterAll(async () => {
            if (personId) await deleteTestPerson(personId)
            await prisma.$disconnect();
        });

    it("should create a person document", async () => {
        const res = await request(app)
        .post("/documents")
        .send({
            documentType: "OTHER",
            fileName: "JEST - NO SETUP",
            fileUrl: "JEST - NO SETUP",
            uploadedBy: "JEST - NO SETUP",
            uploadDate: "2026-05-02 00:00:00.000Z",
            personId: personId
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.fileName).toBe("JEST - NO SETUP");

        personDocumentId = res.body.data.id;
    });

    // DELETE
    it("should delete person document", async () => {
        const res = await request(app).delete(`/documents/${personDocumentId}`);

        expect(res.statusCode).toBe(204);
    });

    // CONFIRM DELETE
    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/documents/${personDocumentId}`);

        expect(res.statusCode).toBe(404);
    })
})