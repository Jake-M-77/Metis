import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestPersonInfo = async (personInfoId: string) => {

    const res = await request(app).delete(`/person-info/${personInfoId}`);

    expect(res.statusCode).toBe(204);

}