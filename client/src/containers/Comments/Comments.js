import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import AuthContext from "../../context/AuthContext";
import {
  GetComments as getCommentsApi,
  CreateComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import axios from "axios";
import { BACKEND_URL } from "../../config";

/**
 * The function to create comments passed from the comment form.
 * @param {]} param0
 * @returns The function returns comments after filtering accoring to parent and child
 */
const Comments = ({ commentsUrl, currentUserId, postData }) => {
  const { user } = useContext(AuthContext);

  const [commentsFromBack, setCommentsFromBack] = useState([]);
  const [commentCurrent, setCommentCurrent] = useState(null);
  const commentParent = commentsFromBack.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    commentsFromBack
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId, user, postData.post_id).then((comment) => {
      setCommentsFromBack([comment, ...commentsFromBack]);
      setCommentCurrent(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = commentsFromBack.map((backendComment) => {
        switch (backendComment.id) {
          case commentId:
            return { ...backendComment, body: text };
          default:
            console.log("Comment");
        }

        return backendComment;
      });
      setCommentsFromBack(updatedBackendComments);
      setCommentCurrent(null);
    });
  };
  const deleteComment = (commentId) => {
    if (!window.confirm("Wanna remove comment?")) return;
    deleteCommentApi().then(() => {
      const updatedBackendComments = commentsFromBack.filter(
        (backendComment) => backendComment.id !== commentId
      );
      setCommentsFromBack(updatedBackendComments);
    });
  };

  useEffect(() => {
    const postId = { post_id: postData.post_id };
    axios.post(`${BACKEND_URL}/comments/comment`, postId).then((res) => {
      const resData = [];
      const returnArray = [];
      for (let i = 0; i < res.data.data.length; i++) {
        resData[i] = res.data.data[i];
      }
      resData.forEach((element) => {
        const returnData = {};
        returnData.id = element.comment_id;
        returnData.body = element.comment_text;
        returnData.username = element.author_name;
        returnData.userId = element.author_email;
        returnData.parentId = element.parent_comment_id;
        returnData.createdAt = element.created_at;
        returnArray.push(returnData);
      });
      setCommentsFromBack(returnArray);
    });
  }, []);

  useEffect(() => {
    switch (commentsFromBack.length) {
      case 0:
        const commentData = getCommentsApi(postData.post_id);
        setCommentsFromBack(commentData);
        break;
      default:
        console.log("Comment");
    }
  }, [commentsFromBack.length]);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Add a comment</div>
      <CommentForm submitLabel="Comment" handleSubmit={addComment} />
      <div className="comments-container">
        {commentParent.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={commentCurrent}
            setActiveComment={setCommentCurrent}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};
/**
 * The container is being exported as Comments
 * so that this container can be imported into other modules.
 */
export default Comments;
