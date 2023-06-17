const request = require("supertest");
const app = require("../server");

describe("Testing API for signing up the charity worker account", () => {
  // Testing the endpoint to fetch user info by email
  it("Signup Charity Worker Account with Checking Correct Signup Code", async () => {
    const name = "Lesile Cheung";
    const email = "lesile212@gmail.com"; // Use a valid email that exists in your database
    const password = "38432&29#323";
    const signUpCode = "698475";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/cwRegister")
      .send({ cwName: name, cwEmail: email, cwPassword: password, signUpCode });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200); // Check if the status code is 200
    expect(res.body).toHaveProperty(
      "message",
      "Successful signing up charity worker account"
    ); // Check if the registration was successful
  });

  // Testing the endpoint to fetch user info by email
  it("Signup Charity Worker Account with Checking Invalid Signup Code", async () => {
    const name = "Ivan Cheung";
    const email = "ivan1213@gmail.com"; // Use a valid email that exists in your database
    const password = "382122&29#323";
    const signUpCode = "123456";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/cwRegister")
      .send({ cwName: name, cwEmail: email, cwPassword: password, signUpCode });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(400); // Check if the status code is 200
    expect(res.body).toHaveProperty("error", "Invalid sign up code"); // Check if the registration was unsuccessful with error message.
  });
});

describe("Testing API for signing up the public account", () => {
  // Testing the endpoint to fetch user info by email
  it("Signup Charity Worker Account with Checking Correct Signup Code", async () => {
    const name = "Ian Chan";
    const email = "ianchan@gmail.com"; // Use a valid email that exists in your database
    const password = "48#efkifewfgjf@";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/v1/pubRegister")
      .send({ pubName: name, pubEmail: email, pubPassword: password });

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200); // Check if the status code is 200
    expect(res.body).toHaveProperty(
      "message",
      "Signing up Public account successful"
    ); // Check if the registration was successful
  });
});
