import request from "supertest";
import { app, server } from "../../../src/index.js";

export const createTestPersonDocument = async (personId: string): Promise<string> => {

    const res = await request(app)
        .post("/documents")
        .send({
            documentType: "OTHER",
            fileName: "JEST - AUTO",
            fileUrl: "JEST - AUTO",
            uploadedBy: "JEST - AUTO",
            uploadDate: "2026-05-01 00:00:00.000",
            personId: personId
        });

    if (res.statusCode !== 201) {
        throw new Error(`Failed to create test person document!: ${res.statusCode}`)
    }

    return res.body.data.id;

}

export default createTestPersonDocument;