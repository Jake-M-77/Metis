import request from "supertest";
import { app, server } from "../src/index.js";
import { prisma } from "../src/db/prisma.js";
import { resolve } from "node:dns";



describe("Person Service Endpoints", () => {
  let personId: string;
  let personFirstName: string;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a person", async () => {
    const res = await request(app)
      .post("/persons")
      .send({
        firstName: "Auto",
        lastName: "Test",
        birthDate: "2000-01-01T00:00:00Z",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe("Auto");


    personId = res.body.id;
    personFirstName = res.body.firstName;
  });

  it("should return all persons", async () => {
    const res = await request(app)
      .get("/persons");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET BY ID
  it("should return person by id", async () => {
    const res = await request(app).get(`/persons/${personId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(personId);
  });

  // UPDATE
  it("should update a person", async () => {
    const res = await request(app)
      .put(`/persons/${personId}`)
      .send({
        firstName: "Updated",
        lastName: "User",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Updated");
  });

  // GET PERSONS BY FIRST NAME (FUZZY SEARCH)

  it("should get a array back of persons matching the firstname (fuzzy search)", async () => {
    const res = await request(app)
    .get("/persons/search")
    .send({
      firstName: `${personFirstName}`
    })

    expect (res.statusCode).toBe(200);
  });

  // DELETE
  it("should delete a person", async () => {
    const res = await request(app).delete(`/persons/${personId}`);

    expect(res.statusCode).toBe(204);
  });

  // CONFIRM DELETE
  it("should return 404 after deletion", async () => {
    const res = await request(app).get(`/persons/${personId}`);

    expect(res.statusCode).toBe(404);
  });


  

});