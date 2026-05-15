import request from "supertest";
import { app, server } from "../../../src/index.js";


export const deleteTestPersonAssociation = async(id: string) => {

    const res = await request(app).delete(`/person-associations/${id}`);

    expect(res.statusCode).toBe(204);
}