const request = require("supertest");
const path = require("path");
const app = require("../server");

describe("Testing API for getting Cat Details", () => {
  // Testing the endpoint to fetch all cat info
  it("Fetch all cat details", async () => {
    const res = await request(app).get("/cat");

    // Assertions for all cat info...
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.response)).toBe(true);
    expect(res.body.response.length).toBeGreaterThan(0);
  });

  // Testing the endpoint to fetch a single cat info by catID
  it("Fetch single cat info by catID", async () => {
    const catID = 1; // Use a valid catID that exists in your database
    const res = await request(app).get(`/cat/${catID}`);

    // Assertions for single cat info
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toHaveProperty("catID", catID);
  });
});

describe("Testing API for creating Cat Details", () => {
  // Login before running any tests
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

  it("Create cat details with valid token", (done) => {
    request(app)
      .post("/cat")
      .set("authorization", `Bearer ${token}`)
      .field("name", "Whiskers")
      .field("gender", "Male")
      .field("age", 2)
      .field("color", "Black")
      .field("breed", "Persian")
      .field("description", "A lovely black cat")
      .field("cwEmail", "maryhung125@yahoo.com")
      .attach("catImage", path.join(__dirname, "catImage/catTest.png"))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe(
          "Details of the cat created successfully!"
        );
        done();
      });
  });
  it("Create cat details with invalid token", (done) => {
    const invalidToken = "12234566";
    request(app)
      .post("/cat")
      .set("authorization", `Bearer ${invalidToken}`)
      .field("name", "Whiskers")
      .field("gender", "Male")
      .field("age", 2)
      .field("color", "Black")
      .field("breed", "Persian")
      .field("description", "A lovely black cat")
      .field("cwEmail", "maryhung125@yahoo.com")
      .attach("catImage", path.join(__dirname, "catImage/catTest.png"))
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Testing API for updating Cat Details", () => {
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

  it("Update cat details with valid token", (done) => {
    const catID = "5"; // replace with the catID to update
    request(app)
      .put(`/cat/${catID}`) // Use PUT method and include the catID in the route
      .set("authorization", `Bearer ${token}`)
      .field("name", "Whisker")
      .field("gender", "Female")
      .field("age", 2)
      .field("color", "White")
      .field("breed", "Persian")
      .field("description", "A lovely white cat")
      .field("cwEmail", "maryhung125@yahoo.com")
      .attach("catImage", path.join(__dirname, "catImage/catTest.png"))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.message).toEqual(
          "Details of the cat updated successfully!"
        );
        done();
      });
  });
  it("Update cat details with invalid token", (done) => {
    const catID = "5"; // replace with the catID to update
    const invalidToken = "12234566";
    request(app)
      .put(`/cat/${catID}`) // Use PUT method and include the catID in the route
      .set("authorization", `Bearer ${invalidToken}`)
      .field("name", "Whisker")
      .field("gender", "Female")
      .field("age", 2)
      .field("color", "White")
      .field("breed", "Persian")
      .field("description", "A lovely white cat")
      .field("cwEmail", "maryhung125@yahoo.com")
      .attach("catImage", path.join(__dirname, "catImage/catTest.png"))
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("Update cat details with error (Cat not found)", (done) => {
    const catID = "30"; // replace with a non-existing catID
    request(app)
      .put(`/cat/${catID}`)
      .set("authorization", `Bearer ${token}`)
      .field("name", "Whisker")
      .field("gender", "Female")
      .field("age", 2)
      .field("color", "White")
      .field("breed", "Persian")
      .field("description", "A lovely white cat")
      .field("cwEmail", "maryhung125@yahoo.com")
      .attach("catImage", path.join(__dirname, "catImage/catTest.png"))
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual("Cat not found");
        done();
      });
  });
});

describe("Testing API for removing Cat Details", () => {
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

  it("Remove cat details successfully", (done) => {
    const catID = "17"; // replace with the catID to remove
    request(app)
      .delete(`/cat/${catID}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.response).toEqual("Cat details have been removed");
        done();
      });
  }, 15000);

  it("Remove cat details with error (Cat not found)", (done) => {
    const catID = "11"; // replace with a non-existing catID
    request(app)
      .delete(`/cat/${catID}`)
      .set("authorization", `Bearer ${token}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.error).toEqual("Cat not found");
        done();
      });
  });
});

describe("Testing API for searching Cats", () => {
  it("Search the cat by name (in DB)", async () => {
    const res = await request(app).get("/cats?name=ammie");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(Array.isArray(res.body.response)).toBe(true);
    expect(res.body.response.length).toBeGreaterThan(0);
  });
  it("Search the cat by color(in DB)", async () => {
    const res = await request(app).get("/cats?color=black");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(Array.isArray(res.body.response)).toBe(true);
    expect(res.body.response.length).toBeGreaterThan(0);
  });
  it("Search the cat by name & color(not in DB)", async () => {
    const res = await request(app).get("/cats?name=susan&color=brown");

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Cat not found");
  });
});
