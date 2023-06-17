const request = require("supertest");
const app = require("../server");

describe("Testing API for getting user info", () => {
  // Testing the endpoint to fetch user info by email
  it("Fetch Charity Worker user info by email", async () => {
    const email = "maryhung125@yahoo.com"; // Use a valid email that exists in your database
    const role = "cw";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/getUserInfo")
      .send({ email, role });

    console.log(res.body);

    // Assertions for user info
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("user.cwEmail");
    expect(res.body).toHaveProperty("user.cwName");
  });

  it("Fetch Public user info by email", async () => {
    const email = "maymay029@yahoo.com"; // Use a valid email that exists in your database
    const role = "pub";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/getUserInfo")
      .send({ email, role });

    console.log(res.body);

    // Assertions for user info
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("user.pubEmail");
    expect(res.body).toHaveProperty("user.pubName");
  });
});
