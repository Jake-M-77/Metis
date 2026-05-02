import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestPersonDescription = async (personId: string): Promise<string> => {

    const res = await request(app)
    .post("/person-descriptions")
    .send({
        descriptorType: "IDENTIFIER",
        description: "JEST - AUTO",
        imageURL: "JEST - AUTO",
        enteredBy: "JEST - AUTO",
        updatedAt: "2026-05-02 00:00:00.000",
        personId: personId,
    });

    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test person description!: ${res.statusCode}`)
    }

    return res.body.data.id;

}

export default createTestPersonDescription