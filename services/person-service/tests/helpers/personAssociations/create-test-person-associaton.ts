import request from "supertest";
import { app, server } from "../../../src/index.js";
import { prisma } from "../../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../../src/utils/ApiResponse.js";

export const createTestPersonAssociation = async (sourcePersonId: string, targetPersonId: string): Promise<string> => {

    const res = await request(app)
    .post("/person-associations")
    .send({
        sourcePersonId: sourcePersonId,
        targetPersonId: targetPersonId,
        relationType: "UNKNOWN",
    });

    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test person association: ${res.statusCode}`)
    }

    return res.body.data.id;
}

export default createTestPersonAssociation;