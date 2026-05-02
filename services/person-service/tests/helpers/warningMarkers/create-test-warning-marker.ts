import request from "supertest";
import { app, server } from "../../../src/index.js";
import { prisma } from "../../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../../src/utils/ApiResponse.js";
import { error } from "node:console";


export const createTestWarningMarker = async (personId:string): Promise<string> => {

    const res = await request(app)
    .post("/warning-markers")
    .send({
        markerType: "INFO",
        description: "JEST - AUTO",
        enteredBy: "JEST - AUTO",
        personId: personId
    });


    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test warning marker!: ${res.statusCode}`)
    }

    return res.body.data.id;
}

export default createTestWarningMarker;