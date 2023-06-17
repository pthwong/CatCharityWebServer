const request = require("supertest");
const app = require("../server");

describe("Testing API for updating user info", () => {
  it("Successfully update the name only", async () => {
    const endpoint = "/v1/updateUserInfo";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      name: "Kwan Ho Ching Chingee",
    };

    const res = await request(app)
      .put(endpoint)
      .send(requestBody)
      .set("Accept", "application/json"); // set any necessary headers

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Name updated successfully");
  });

  it("Successfully update the password", async () => {
    const endpoint = "/v1/updateUserInfo";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "12345678#",
      newPassword: "23456*890",
      retypeNewPassword: "23456*890",
    };

    const res = await request(app)
      .put(endpoint)
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
    const endpoint = "/v1/updateUserInfo";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "12345678#",
      newPassword: "23456*890",
      retypeNewPassword: "23456*890",
    };

    const res = await request(app)
      .put(endpoint)
      .send(requestBody)
      .set("Accept", "application/json"); // set any necessary headers

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Old password is incorrect");
  });

  it("Fail to update password if new password and retype password do not match", async () => {
    const endpoint = "/v1/updateUserInfo";
    const requestBody = {
      email: "khc123@gmail.com",
      role: "cw",
      oldPassword: "23456*890",
      newPassword: "23456*8901",
      retypeNewPassword: "23456*8902",
    };

    const res = await request(app)
      .put(endpoint)
      .send(requestBody)
      .set("Accept", "application/json"); // set any necessary headers

    console.log(res.body);

    // Assertions
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "error",
      "New password and retype password do not match"
    );
  });
});
