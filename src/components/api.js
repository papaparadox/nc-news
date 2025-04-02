import axios from "axios";

const api = axios.create({
  baseURL: "https://seeding-ncnews.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data;
  });
};

export const getArticleByID = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const updateCommentVotes = (comment_id) => {
  return api.patch(`/comments/${comment_id}`, { inc_votes: 1 });
};

export const downVoteCommentVotes = (comment_id) => {
  return api.patch(`/comments/${comment_id}`, { inc_votes: -1 });
};

export const updateArticleVotes = (article_id) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: 1 });
};

export const downVoteArticleVotes = (article_id) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: -1 });
};

export const postComment = (article_id, messageBody) => {
  return api.post(`/articles/${article_id}/comments`, {
    username: "grumpy19",
    body: messageBody,
  });
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};
