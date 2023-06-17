const request = require("supertest");
const app = require("../server");

describe("Testing API for signing in the charity worker account", () => {
  it("Signin Charity Worker Account with valid email & password", async () => {
    const email = "lesile212@gmail.com"; // Use a valid email that exists in your database
    const password = "38432&29#323";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/cwLogin")
      .send({ cwEmail: email, cwPassword: password });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200); // Check if the status code is 200
    expect(res.body).toHaveProperty("token"); // Check if the response contains a token
  });
  it("Signin Charity Worker Account with invalid email or password", async () => {
    const email = "lesile212@gmail.com"; // Use a valid email that exists in your database
    const password = "48#efkifewfgjf@";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/cwLogin")
      .send({ cwEmail: email, cwPassword: password });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(401); // Check if the status code is 401
    expect(res.body).toHaveProperty("error", "Invalid email or password"); // Check if the error message is as expected
  });
});

describe("Testing API for signing in the public account", () => {
  it("Signin Public Account with valid email & password", async () => {
    const email = "peterleung123@gmail.com"; // Use a valid email that exists in your database
    const password = "32432#@13232";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/pubLogin")
      .send({ pubEmail: email, pubPassword: password });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200); // Check if the status code is 200
    expect(res.body).toHaveProperty("token"); // Check if the response contains a token
  });
  it("Signin Public Account with invalid email or password", async () => {
    const email = "peterleung123@gmail.com"; // Use a valid email that exists in your database
    const password = "48#efkifewfgjf@";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/pubLogin")
      .send({ pubEmail: email, pubPassword: password });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(401); // Check if the status code is 401
    expect(res.body).toHaveProperty("error", "Invalid email or password"); // Check if the error message is as expected
  });
});
