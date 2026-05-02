import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestCustodyPhoto = async (custodyPhotoId: string) => {

    const res = await request(app).delete(`/custody-photos/${custodyPhotoId}`)

    expect(res.statusCode).toBe(204);
}