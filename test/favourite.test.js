const request = require("supertest");
const app = require("../server");

describe("Testing the favourite cats API", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post("/pubLogin").send({
      pubEmail: "peterleung123@gmail.com", // Replace with valid email
      pubPassword: "32432#@13232", // Replace with valid password
    });
    console.log(response.body);
    token = response.body.token;
    console.log("Token:", token);
  });

  // Test adding a cat to the favourites list
  it("Add a cat to favourites successfully", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "1",
    };

    request(app)
      .post("/addFavourite")
      .set("authorization", `Bearer ${token}`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          "Cat added to favourites successfully"
        );
        done();
      });
  });

  // Test displaying favourites list
  it("Display favourites list successfully", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "1",
    };

    request(app)
      .post("/favourite")
      .set("authorization", `Bearer ${token}`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.response.length).toBeGreaterThan(0);
        done();
      });
  });

  // Test removing a cat from the favourites list
  it("Remove a cat from favourites successfully", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "1",
    };

    request(app)
      .delete("/favourite")
      .set("authorization", `Bearer ${token}`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual(
          "Cat removed from favourites successfully"
        );
        done();
      });
  });

  // Test trying to remove a cat that is not in the favourites list
  it("Return 404 for a cat not in favourites while removing the favourite cat", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "100", // Assuming this catID does not exist
    };

    request(app)
      .delete("/favourite")
      .set("authorization", `Bearer ${token}`)
      .send(data)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).toEqual("Cat not found in favourites");
        done();
      });
  });
});
