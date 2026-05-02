import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestPersonDocument = async (personDocumentId: string) => {

    const res = await request(app).delete(`/documents/${personDocumentId}`);

    expect(res.statusCode).toBe(204);
}