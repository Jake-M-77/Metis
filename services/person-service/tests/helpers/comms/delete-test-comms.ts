import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestComms = async (commsId: string) => {

    const res = await request(app).delete(`/comms/${commsId}`);

    expect(res.statusCode).toBe(204);
}