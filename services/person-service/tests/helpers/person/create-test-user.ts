import request from "supertest";
import { app, server } from "../../../src/index.js";
import { prisma } from "../../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../../src/utils/ApiResponse.js";


export const createTestPerson = async (): Promise<string> => {


        const res = await request(app)
            .post("/persons")
            .send({
                firstName: "JEST - AUTO",
                lastName: "JEST - AUTO",
                birthDate: "2000-01-01T00:00:00Z",
                sex: "Male",
                ethnicity: "White-British",
                pncId: "UNKNOWN",
            });

        if (res.statusCode !== 201) {
            throw new Error(`Failed to create test person!: ${res.statusCode}`)
        }

        return res.body.data.id;

    ;

}


export default createTestPerson;