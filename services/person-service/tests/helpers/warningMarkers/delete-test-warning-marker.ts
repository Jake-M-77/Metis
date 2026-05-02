import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestWarningMarker = async (warningMarkerId: string) => {

    const res = await request(app).delete(`/warning-markers/${warningMarkerId}`);

    expect(res.statusCode).toBe(204);

}