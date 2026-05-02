import request from "supertest";
import { app, server } from "../../../src/index.js";

export const deleteTestPersonAlias = async (personAliasId: string) => {

    const res = await request(app).delete(`/person-aliases/${personAliasId}`);

    expect(res.statusCode).toBe(204);

}