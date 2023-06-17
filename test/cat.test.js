const request = require("supertest");
const app = require("../server");

describe("Testing API for getting Cat Details", () => {
  // Testing the endpoint to fetch all cat info
  it("Fetch all cat details", async () => {
    const res = await request(app).get("/v1/cat");

    // Assertions for all cat info...
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(Array.isArray(res.body.response)).toBe(true);
    expect(res.body.response.length).toBeGreaterThan(0);
  });

  // Testing the endpoint to fetch a single cat info by catID
  it("Fetch single cat info by catID", async () => {
    const catID = 1; // Use a valid catID that exists in your database
    const res = await request(app).get(`/v1/cat/${catID}`);

    // Assertions for single cat info
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", 200);
    expect(res.body).toHaveProperty("response");
    expect(Array.isArray(res.body.response)).toBe(true);
    expect(res.body.response.length).toEqual(1);
    expect(res.body.response[0]).toHaveProperty("catID", catID);
  });
});
