import request from "supertest";
import { app, server } from "../../src/index.js";
import { prisma } from "../../src/db/prisma.js";
import createTestCustodyPhoto from "../helpers/custodyPhotos/create-test-custody-photo.js";
import createTestPerson from "../helpers/person/create-test-user.js";
import { deleteTestCustodyPhoto } from "../helpers/custodyPhotos/delete-test-custody-photo.js";
import { deleteTestPerson } from "../helpers/person/delete-test-user.js";

describe("Custody Photos Endpoints - with auto setup", () => {
    let personId: string;
    let custodyPhotoId: string;

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        personId = await createTestPerson();
        custodyPhotoId = await createTestCustodyPhoto(personId);
    })

    afterEach(async () => {
        if (custodyPhotoId) await deleteTestCustodyPhoto(custodyPhotoId)
        if (personId) await deleteTestPerson(personId)
    })


    // GET BY ID

    it("should return custody photo by id", async () => {
        const res = await request(app).get(`/custody-photos/${custodyPhotoId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(custodyPhotoId);
    });

    // UPDATE

    it("should update custody photo", async () => {
        const res = await request(app)
            .put(`/custody-photos/${custodyPhotoId}`)
            .send({
                uploadedBy: "JEST - AUTOSETUP",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.uploadedBy).toBe("JEST - AUTOSETUP")
    });
});

describe("Custody Photos Endpoints - without setup", () => {

    let personId: string;
    let custodyPhotoId: string;

    beforeAll(async () => {
        personId = await createTestPerson();
    })

    afterAll(async () => {
        if (personId) await deleteTestPerson(personId)
        await prisma.$disconnect();
    });

    it("should create a custody photo", async () => {
        const res = await request(app)
            .post("/custody-photos")
            .send({
                imageUrl: "JEST - NO SETUP",
                uploadedBy: "JEST - NO SETUP",
                personId: personId,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.uploadedBy).toBe("JEST - NO SETUP");

        custodyPhotoId = res.body.data.id;
    });

    // DELETE

    it("should delete custody photo", async () => {
        const res = await request(app).delete(`/custody-photos/${custodyPhotoId}`);

        expect(res.statusCode).toBe(204);
    });

    // CONFIRM DELETE
    it("should return 404 after deletion", async () => {
        const res = await request(app).get(`/custody-photos/${custodyPhotoId}`);

        expect(res.statusCode).toBe(404);
    })
})

describe("Custody Photos Batch Endpoint", () => {
    let personId1: string;
    let personId2: string;
    let personId3: string;

    let custodyPhotoId1: string;
    let custodyPhotoId2: string;
    let custodyPhotoId3: string;

    const personIds: string[] = [];
    const custodyPhotoIds: string[] = [];



    beforeAll(async () => {
        personId1 = await createTestPerson();
        personId2 = await createTestPerson();
        personId3 = await createTestPerson();

        custodyPhotoId1 = await createTestCustodyPhoto(personId1);
        custodyPhotoId2 = await createTestCustodyPhoto(personId2);
        custodyPhotoId3 = await createTestCustodyPhoto(personId3);


        personIds.push(personId1);
        personIds.push(personId2);
        personIds.push(personId3);

        custodyPhotoIds.push(custodyPhotoId1);
        custodyPhotoIds.push(custodyPhotoId2);
        custodyPhotoIds.push(custodyPhotoId3);


    })

    afterAll(async () => {
        if (custodyPhotoId1) {
            await deleteTestCustodyPhoto(custodyPhotoId1)
        }
        if (custodyPhotoId2) {
            await deleteTestCustodyPhoto(custodyPhotoId2)
        }
        if (custodyPhotoId3) {
            await deleteTestCustodyPhoto(custodyPhotoId3)
        }


        if (personId1) {
            await deleteTestPerson(personId1)
        }
        if (personId2) {
            await deleteTestPerson(personId2)
        }
        if (personId3) {
            await deleteTestPerson(personId3)
        }

        await prisma.$disconnect();
    })

    it("should get a batch of custody photos back with the person id strings", async () => {
        const res = await request(app)
            .post("/custody-photos/batch")
            .send(personIds)

        expect(res.statusCode).toBe(200);
        for (const [key, value] of Object.entries(res.body.data)) {
            expect(personIds).toContain(key);
        }
    });
})