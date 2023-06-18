const request = require("supertest");
const app = require("../server");

describe("Testing the favourite cats API", () => {
  // Test adding a cat to the favourites list
  it("Add a cat to favourites successfully", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "1",
    };

    request(app)
      .post("/addFavourite")
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

  // Test removing a cat from the favourites list
  it("Remove a cat from favourites successfully", (done) => {
    const data = {
      pubEmail: "peterleung123@gmail.com",
      catID: "1",
    };

    request(app)
      .delete("/favourite")
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
      .send(data)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).toEqual("Cat not found in favourites");
        done();
      });
  });
});
