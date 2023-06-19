const request = require("supertest");
const app = require("../server");

describe("Testing API for getting user info", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post("/cwLogin").send({
      cwEmail: "maryhung125@yahoo.com", // Replace with valid email
      cwPassword: "1234*#5678", // Replace with valid password
    });
    console.log(response.body);
    token = response.body.token;
    console.log("Token:", token);
  });

  // Testing the endpoint to fetch user info by email
  it("Fetch Charity Worker user info by email", async () => {
    // Login before running any tests
    const email = "maryhung125@yahoo.com"; // Use a valid email that exists in your database
    const role = "cw";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/user")
      .set("authorization", `Bearer ${token}`)
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
      .post("/user")
      .set("authorization", `Bearer ${token}`)
      .send({ email, role });

    console.log(res.body);

    // Assertions for user info
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("user.pubEmail");
    expect(res.body).toHaveProperty("user.pubName");
  });
  it("Fetch Charity Worker user info by email (Invalid)", async () => {
    const email = "maryhung125@yahoo.com.hk"; // Use a invalid email that exists in your database
    const role = "cw";

    // Sending a POST request with email in the request body
    const res = await request(app)
      .post("/user")
      .set("authorization", `Bearer ${token}`)
      .send({ email, role });

    console.log(res.body);

    // Assertions for user info
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("Testing API for updating user info", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post("/cwLogin").send({
      cwEmail: "khc123@gmail.com", // Replace with valid email
      cwPassword: "12345678#", // Replace with valid password
    });
    console.log(response.body);
    token = response.body.token;
    console.log("Token:", token);
  });

  it("Update info with user not found Error", async () => {
    const endpoint = "/user";
    const requestBody = {
      email: "khc123@yahoo.com",
      role: "cw",
      name: "Kwan Ho Ching Chingee",
    };

    const res = await request(app)
      .put(endpoint)
      .set("authorization", `Bearer ${token}`)
      .send(requestBody)
      .set("Accept", "application/json");

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });
  it("Successfully update the name only", async () => {
    const endpoint = "/user";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      name: "Kwan Ho Ching Chingee",
    };

    const res = await request(app)
      .put(endpoint)
      .set("authorization", `Bearer ${token}`)
      .send(requestBody)
      .set("Accept", "application/json");

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Name updated successfully");
  });

  it("Successfully update the password", async () => {
    const endpoint = "/user";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "12345678#",
      newPassword: "23456*890",
      retypeNewPassword: "23456*890",
    };

    const res = await request(app)
      .put(endpoint)
      .set("authorization", `Bearer ${token}`)
      .send(requestBody)
      .set("Accept", "application/json"); // set any necessary headers

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "User Info updated successfully"
    );
  });

  it("Fail to update password if the old password is incorrect", async () => {
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "12345678#",
      newPassword: "23456*890",
      retypeNewPassword: "23456*890",
    };

    const endpoint = "/user";

    const res = await request(app)
      .put(endpoint)
      .set("authorization", `Bearer ${token}`)
      .send(requestBody)
      .set("Accept", "application/json");

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Old password is incorrect");
  });

  it("Fail to update password if new password and retype password do not match", async () => {
    const endpoint = "/user";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "12345678#",
      newPassword: "23456*8901",
      retypeNewPassword: "23456*8902",
    };

    const res = await request(app)
      .put(endpoint)
      .set("authorization", `Bearer ${token}`)
      .send(requestBody)
      .set("Accept", "application/json");

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });
});
