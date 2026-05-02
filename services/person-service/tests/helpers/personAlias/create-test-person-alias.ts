import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestPersonAlias = async (personId: string): Promise<string> => {

    const res = await request(app)
    .post("/person-aliases")
    .send({
        aliasName: "JEST - AUTO",
        enteredBy: "JEST - AUTO",
        personId: personId
    });

    if(res.statusCode !== 201) {
        throw new Error(`Failed to create test person alias!: ${res.statusCode}`)
    }

    return res.body.data.id

}

export default createTestPersonAlias