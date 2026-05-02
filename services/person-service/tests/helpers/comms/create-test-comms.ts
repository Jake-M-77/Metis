import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestComms = async (personId: string): Promise<string> => {

    const res = await request(app)
    .post("/comms")
    .send({
        contactType: "PHONE",
        contactValue: "JEST - AUTO",
        personId: personId,
    });

    if(res.statusCode !== 201) {
        throw new Error(`Failed to create test comms!: ${res.statusCode}`)
    }

    return res.body.data.id;

}