import { useEffect, useState } from "react";
import { downVoteCommentVotes, updateCommentVotes } from "../api";

export default function CommentCard({ comment }) {
  const date = new Date(comment.created_at);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [error, setError] = useState(null);

  function handleVote() {
    updateCommentVotes(comment.comment_id)
      .then(() => {
        setError(null);
      })
      .catch(() => {
        setCurrentVotes((prev) => prev - 1);
        setError("Failed to vote. Try again!");
      });
    setCurrentVotes(currentVotes + 1);
  }
  function handleDownVote() {
    downVoteCommentVotes(comment.comment_id)
      .then(() => {
        setError(null);
      })
      .catch(() => {
        setCurrentVotes((prev) => prev + 1);
        setError("Failed to vote. Try again!");
      });
    setCurrentVotes(currentVotes - 1);
  }
  return (
    <div className='comments'>
      <h4>{comment.author} writes:</h4>
      <p>{comment.body}</p>
      <p>Posted on: {date.toLocaleString()}</p>
      <p>Votes: {comment.votes + currentVotes}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleDownVote}>DownVote</button>
      {error && <p id='vote-error'>{error}</p>}
    </div>
  );
}
