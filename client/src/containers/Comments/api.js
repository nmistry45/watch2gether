import { BACKEND_URL } from "../../config";
import axios from "axios";
/**
 * The function is responsible for creating the
 * container for the data insertion, upation, deletion of the comments
 * @param {*} backendComments The parameters include the comments data
 * @returns The function returns the commentdata after the interaction
 * with the database.
 */
export function GetComments(post_id) {
  const resData = [];
  const returnArray = [];
  const postData = { post_id: post_id };
  axios.post(`${BACKEND_URL}/comments/comment`, postData).then((res) => {
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
  });

  return returnArray;
}
/**
 * The function is responsible for creating the container for the create comment module
 * @param {*} text
 * @param {*} parentId
 * @returns The object of comment data
 */

export const CreateComment = async (text, parentId = null, user, post_id) => {
  const commentData = {
    comment_id: Math.random().toString(36).substr(2, 9),
    comment_text: text,
    post_id: post_id,
    author_name: user.user.firstName,
    author_email: user.user.email,
    parent_comment_id: parentId,
    created_at: new Date().toISOString(),
  };
  try {
    await axios.post(`${BACKEND_URL}/comments/createComment`, commentData);
  } catch (err) {
    console.error(err.response);
  }
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: user.user.email,
    username: user.user.firstName,
    createdAt: new Date().toISOString(),
  };
};
/**
 * The container is being exported as upateComment
 * so that this container can be imported into other modules.
 */
export const updateComment = async (text) => {
  return { text };
};
/**
 * The container is being exported as deleteComment
 * so that this container can be imported into other modules.
 */
export const deleteComment = async () => {
  return {};
};
