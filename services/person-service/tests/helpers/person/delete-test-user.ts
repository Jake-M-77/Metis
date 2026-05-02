import request from "supertest";
import { app, server } from "../../../src/index.js";
import { prisma } from "../../../src/db/prisma.js";
import { resolve } from "node:dns";
import { successResponse } from "../../../src/utils/ApiResponse.js";


export const deleteTestPerson = async (personId: string) => {


  const res = await request(app).delete(`/persons/${personId}`);

  expect(res.statusCode).toBe(204);
  
}