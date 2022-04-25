const existingPostSchema_mock = {
    creation_date: "22/4/2022",
    movie_show_id: "123456",
    watchgroup_id: "098765",
    poster_url: "https://fxgh@skmx.com",
    userid: "2345678",
    post_descr: "hos ioji",
    post_comments: [
      {
        commentid: "1234",
        parentcommentid: "345",
        postid: "56",
        comment_text: "xyz",
        user: {
          firstName: "abc",
          lastName: "def",
          email: "abc@hui.com",
        },
      },
    ],
}

module.exports = {existingPostSchema_mock};