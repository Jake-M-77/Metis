import { prisma } from "../../src/db/prisma.js";
import { app } from "../../src/index.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";
import createTestPersonAssociation from "../helpers/personAssociations/create-test-person-associaton.js";
import { deleteTestPersonAssociation } from "../helpers/personAssociations/delete-test-person-association.js";
import request from "supertest";



describe("Person Associations Endpoints = with auto setup", () => {
    let sourcePersonId: string; 
    let targetPersonId: string;
    let updateTargetPersonId: string;
    let personAssociationId: string; 

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        sourcePersonId = await createTestPerson();
        targetPersonId = await createTestPerson();
        updateTargetPersonId = await createTestPerson();

        personAssociationId = await createTestPersonAssociation(sourcePersonId, targetPersonId);
    })

    afterEach(async () => {
        if(personAssociationId) await deleteTestPersonAssociation(personAssociationId);
        if(sourcePersonId) await deleteTestPerson(sourcePersonId);
        if(targetPersonId) await deleteTestPerson(targetPersonId);
        if(updateTargetPersonId) await deleteTestPerson(updateTargetPersonId);
    })


    // GET BY ID
    it("should return person association by id", async () => {

        const res = await request(app).get(`/person-associations/${personAssociationId}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(personAssociationId);
    })

    // GET ASSOCIATION BY PERSON ID
    it("should return person association using sourcePersonId", async () => {
        const res = await request(app).get(`/person-associations/pid/${sourcePersonId}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].id).toBe(personAssociationId);
    })

    // UPDATE
    it("should update person association", async () => {
        const res = await request(app)
        .put(`/person-associations/${personAssociationId}`)
        .send({
            targetPersonId: updateTargetPersonId
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.targetPersonId).toBe(updateTargetPersonId);
    })

});

describe("Person Associations Endpoints - without setup", () => {

    let sourcePersonId: string; 
    let targetPersonId: string;
    let personAssociationId: string; 

    beforeAll(async () => {
        sourcePersonId = await createTestPerson();
        targetPersonId = await createTestPerson();
    })

    afterAll(async () => {
        if(sourcePersonId) await deleteTestPerson(sourcePersonId);
        if(targetPersonId) await deleteTestPerson(targetPersonId);
    })


    it("should create a person association", async () => {
        const res = await request(app)
        .post("/person-associations")
        .send({
            sourcePersonId: sourcePersonId,
            targetPersonId: targetPersonId,
            relationType: "TESTING",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.sourcePersonId).toBeDefined();
        expect(res.body.data.relationType).toBe("TESTING");

        personAssociationId = res.body.data.id;

    });

    it("should check the OUTGOING relationType as 'TESTING' ", async () => {
        const res = await request(app)
        .get(`/person-associations/pid/${sourcePersonId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].relationType).toBe("TESTING");
        expect(res.body.data[0].direction).toBe("OUTGOING");
        
        
    })

    it("should check the 'INCOMING' relationType as 'TESTING_INVERSE' ", async () => {
        const res = await request(app)
        .get(`/person-associations/pid/${targetPersonId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].relationType).toBe("TESTING_INVERSE");
        expect(res.body.data[0].direction).toBe("INCOMING");
        
        
    })

    // DELETE
    it("Should delete person association", async () => { 
        const res = await request(app).delete(`/person-associations/${personAssociationId}`);

        expect(res.statusCode).toBe(204);
    })

    //CONFIRM DELETE
    it("Should return 404 after deletion", async () => {

        const res = await request(app).get(`/person-assocations/${personAssociationId}`);

        expect(res.statusCode).toBe(404);
    })

})