import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../src/utils/ApiResponse.js";
import { createTestPerson } from "../helpers/person/create-test-user.js"
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";
import createTestWarningMarker from "../helpers/warningMarkers/create-test-warning-marker.js";
import { deleteTestWarningMarker } from "../helpers/warningMarkers/delete-test-warning-marker.js";


describe("Warning Markers Endpoints - with auto setup", () => {

    let personId: string;
    let warningMarkerId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        warningMarkerId = await createTestWarningMarker(personId);


    })

    afterEach(async () => {
        if (warningMarkerId) await deleteTestWarningMarker(warningMarkerId);
        if (personId) await deleteTestPerson(personId)
    })


    // GET BY ID
    it("should return warning marker by id", async () => {
        const res = await request(app).get(`/warning-markers/${warningMarkerId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(warningMarkerId);
    })

    // UPDATE
    it("should update a warning marker", async () => {
        const res = await request(app)
            .put(`/warning-markers/${warningMarkerId}`)
            .send({
                description: "JEST - AUTOSETUP",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.description).toBe("JEST - AUTOSETUP");
    });

});

describe("Warning Markers Endpoints - without setup", () => {

    let personId: string;
    let warningMarkerId: string;

    afterAll(async () => {
        if(personId){
            await deleteTestPerson(personId);
        }

        await prisma.$disconnect();
    });

    it("should create a person", async () => {
        const res = await request(app)
            .post("/persons")
            .send({
                firstName: "JEST - NO SETUP",
                lastName: "JEST",
                birthDate: "2000-01-01T00:00:00Z",
                sex: "Male",
                ethnicity: "White-British",
                pncId: "UNKNOWN",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.firstName).toBe("JEST - NO SETUP");


        personId = res.body.data.id;
    });

    it("should return all warning markers", async () => {
        const res = await request(app)
            .get("/warning-markers");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);

    });

    it("should create a warning marker", async () => {
        const res = await request(app)
            .post("/warning-markers")
            .send({
                markerType: "INFO",
                description: "JEST - NO SETUP",
                enteredBy: "JEST -  NO SETUP",
                personId: `${personId}`
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.description).toBe("JEST - NO SETUP");

        warningMarkerId = res.body.data.id;
    });

    // DELETE
    it("should delete warning marker", async () => {
        const res = await request(app).delete(`/warning-markers/${warningMarkerId}`);

        expect(res.statusCode).toBe(204);
    });

    // CONFIRM DELETE
    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/warning-markers/${warningMarkerId}`);

        expect(res.statusCode).toBe(404);
    });

});