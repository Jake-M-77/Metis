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

describe("Custodoy Photos Endpoints - without setup", () => {

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