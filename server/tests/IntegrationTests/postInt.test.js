const index = require("../../routers/postRouter");
const request = require("supertest");
const express = require("express");
//const src = require("../src/index");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);
jest.setTimeout(30000000);
test("Integration Testing Create Post", done => {
  const expected = {};
     request(app)
      .post("/createPost")
      .type("form")
      .send({ title: "hey", description: "Hello"})
      .then(() => {
        request(app)
          .get("/createPost")
          .expect(expected, done);
      });
  });
  
  
  test("Integration Testing Fetch Post", done => {
    const expected = {};
    request(app)
      .post("/post")
      .type("form")
      .send({ discussion_thread_id: "4" })
      .then(() => {
        request(app)
          .get("/post")
          .expect(expected, done);
      });
  });


  test("Integration Testing Update Post By Likes", done => {
    const expected = {};
    request(app)
      .post("/likePostCount")
      .type("form")
      .send({ post_id: "45" },
        { total_points: 657 })
      .then(() => {
        request(app)
          .get("/likePostCount")
          .expect(expected, done);
      });
  });

  test("Integration Testing Update Post By Likes", done => {
    const expected = {};
    request(app)
      .post("/fetchPostByID")
      .type("form")
      .send({ post_id: "81" })
      .then(() => {
        request(app)
          .get("/fetchPostByID")
          .expect(expected, done);
      });
  });
  test("Integration Testing Fetch All Posts", done => {
    const expected = {};
    request(app)
      .post("/fetchAllPost")
      .type("form")
      .send({ email: "54321hemanth@gmail.com" })
      .then(() => {
        request(app)
          .get("/fetchAllPost")
          .expect(expected, done);
      });
  });

  let elementId;
  describe("Test Post", () => {
    test("POST /send", (done) => {
      request(app)
        .post("/createPost")
        .expect("Content-Type", /json/)
        .send({
            title: "Post Title",
            description: "Hello"
          })
          .expect((res) => {
            res.body.success = true;
          })
          .end((err, res) => {
            if (err) return done(err);
            elementId = res.body.success;
            return done();
          });
    });
  });

  
