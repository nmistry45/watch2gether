// const Post = require("../../models/postModel");
const ExistingPost = require("../../models/existingPostModel");

/**
 * insert newly added post in discussion thread by user
 * @param {*} req - request from the front end
 * @param {*} res - response sent to the view
 */
exports.insertPost = function (req, res) {
  const createPostData = new ExistingPost();
  const {
    post_title,
    post_descr,
    watchgroup_id,
    movie_show_id,
    creation_date,
    firstName,
    lastName,
    poster_url,
    post_id,
    total_points,
    email,
  } = req.body;

  (createPostData.post_title = post_title),
    (createPostData.post_descr = post_descr),
    (createPostData.watchgroup_id = watchgroup_id),
    (createPostData.movie_show_id = movie_show_id),
    (createPostData.creation_date = Date.now().toString()),
    (createPostData.firstName = firstName),
    (createPostData.lastName = lastName),
    (createPostData.poster_url = poster_url),
    (createPostData.post_id = post_id),
    (createPostData.total_points = total_points),
    (createPostData.email = email);

  createPostData.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

/**
 * fetch the posts in discussion thread by thread_id
 * @param {*} req - request from the front end
 * @param {*} res - response sent to the view
 */
exports.fetchPost = function (req, res) {
  ExistingPost.find(
    { watchgroup_id: req.body.watchgroup_id },
    function (err, postList) {
      if (err) return res.json({ success: false, error: err });
      res.json({ data: postList });
    }
  );
};

exports.updatePostByLikes = function (req, res) {
  ExistingPost.findOneAndUpdate(
    { post_id: req.body.post_id },
    { total_points: req.body.total_points },
    function (err, postList) {
      if (err) return res.json({ success: false, error: err });
      res.json({ data: postList });
    }
  );
};

exports.fetchPostByID = function (req, res) {
  ExistingPost.find({ post_id: req.body.post_id }, function (err, postList) {
    if (err) return res.json({ success: false, error: err });
    res.json({ data: postList });
  });
};

exports.fetchAllPost = function (req, res) {
  ExistingPost.find({ email: req.body.email }, function (err, postList) {
    if (err) return res.json({ success: false, error: err });
    res.json({ data: postList });
  });
};
