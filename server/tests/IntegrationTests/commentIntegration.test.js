const index = require("../../routers/commentRouter");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);
jest.setTimeout(30000000);
test("Integration Testing Create Comment", done => {
  const expected = {};
     request(app)
      .post("/createComment")
      .type("form")
      .send({
        comment_id: '432', 
        comment_text: 'sangram', 
        author_name: "sangram", 
        author_email: 'sangram', 
        parent_comment_id: '765', 
        created_at: '678' })
      .then(() => {
        request(app)
          .get("/createComment")
          .expect(expected, done);
      });
  });
  
  test("Integration Testing Comment", done => {
    const expected = {};
       request(app)
        .post("/comment")
        .type("form")
        .send({post_id: '345467'})
        .then(() => {
          request(app)
            .get("/comment")
            .expect(expected, done);
        });
    });

    test("Integration Testing Delete Comment", done => {
        const expected = {};
           request(app)
            .post("/deleteComment")
            .type("form")
            .send({comment_id: '9876' })
            .then(() => {
              request(app)
                .get("/deleteComment")
                .expect(expected, done);
            });
        });

    test("Integration Testing Delete Comment", done => {
            const expected = {};
               request(app)
                .post("/updateComment")
                .type("form")
                .send({comment_id: '4657' })
                .then(() => {
                  request(app)
                    .get("/updateComment")
                    .expect(expected, done);
                });
            });
    