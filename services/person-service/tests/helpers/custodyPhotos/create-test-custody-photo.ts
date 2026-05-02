import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestCustodyPhoto = async (personId: string): Promise<string> => {


    const res = await request(app)
    .post("/custody-photos")
    .send({
        imageUrl: "JEST - AUTO",
        uploadedBy: "JEST - AUTO",
        personId: personId,
    });

    if(res.statusCode !== 201) {
        throw new Error(`Failed to create test custody photo!: ${res.statusCode}`)
    }

    return res.body.data.id;
}

export default createTestCustodyPhoto;