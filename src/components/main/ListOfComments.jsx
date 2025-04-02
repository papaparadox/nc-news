import { useState, useEffect } from "react";
import { getComments, postComment } from "../api";
import CommentCard from "./CommentCard";

export default function ListOfComments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [successComment, setSuccessComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    getComments(article_id).then(({ comment }) => {
      setComments(comment);
    });
  }, []);

  function handleChange(event) {
    setMessageBody(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (messageBody.length === 0) {
      setWarning("The message can't be empty");
      return;
    }

    setIsLoading(true);

    postComment(article_id, messageBody).then(({ data: { newComment } }) => {
      setComments((currentComments) => [newComment, ...currentComments]);
      setSuccessComment("Comment posted!");
      setWarning(null);
      setMessageBody("");
      setIsLoading(false);
    });
  }

  return (
    <section className='comment-section'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='body-text'>Write your comment:</label>
        <textarea
          value={messageBody}
          onChange={handleChange}
          placeholder='Write your message here..'
          required
        ></textarea>
        <button id='submit-button' type='submit' disabled={isLoading}>
          Post
        </button>
      </form>
      {successComment && <p id='successful-message'>{successComment}</p>}
      {warning && <p id='warning-message'>{warning}</p>}
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setComments={setComments}
            comments={comments}
          />
        );
      })}
    </section>
  );
}
