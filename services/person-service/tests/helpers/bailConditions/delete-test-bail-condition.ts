import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestBailCondition = async (bailConditionId: string) => {

    const res = await request(app).delete(`/bail-conditions/${bailConditionId}`);

    expect(res.statusCode).toBe(204);
}