import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestPersonDescription = async (personDescriptionId: string) => {

    const res = await request(app).delete(`/person-descriptions/${personDescriptionId}`);

    expect(res.statusCode).toBe(204);

}