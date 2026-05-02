import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestPersonInfo = async (personId: string): Promise<string> => {

    const res = await request(app)
        .post("/person-info")
        .send({
            recordCreatedBy: "JEST - AUTO",
            sourceSystem: "METIS",
            lastModifiedBy: "JEST - AUTO",
            lastModifiedDate: "2026-05-02 00:00:00.000",
            personId: personId,
        });

    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test person info!: ${res.statusCode}`)

    }

    return res.body.data.id;

}

export default createTestPersonInfo;