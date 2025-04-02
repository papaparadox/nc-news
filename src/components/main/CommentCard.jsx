import { useEffect, useState } from "react";
import { downVoteCommentVotes, updateCommentVotes } from "../api";

export default function CommentCard({ comment }) {
  const date = new Date(comment.created_at);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [error, setError] = useState(null);
  const [isVoteClicked, setIsVoteClicked] = useState(false);
  const [isDownVoteClicked, setIsDownVoteClicked] = useState(false);
  const [successVote, setSuccessVote] = useState(null);

  function handleVote() {
    if (!isVoteClicked) {
      updateCommentVotes(comment.comment_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentVotes((prev) => prev - 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentVotes(currentVotes + 1);
      setIsVoteClicked(true);
      setSuccessVote("The comment was upvoted!");
    } else {
      downVoteCommentVotes(comment.comment_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentVotes((prev) => prev + 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentVotes(currentVotes - 1);
      setIsVoteClicked(false);
      setSuccessVote("Upvote was retrieved!");
    }
  }
  function handleDownVote() {
    if (!isDownVoteClicked) {
      downVoteCommentVotes(comment.comment_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentVotes((prev) => prev + 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentVotes(currentVotes - 1);
      setIsDownVoteClicked(true);
      setSuccessVote("The post was downvoted!");
    } else {
      updateCommentVotes(comment.comment_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentVotes((prev) => prev - 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentVotes(currentVotes + 1);
      setIsDownVoteClicked(false);
      setSuccessVote("Downvote was retrieved!");
    }
  }
  return (
    <div className='comments'>
      <h4>{comment.author} writes:</h4>
      <p>{comment.body}</p>
      <p>Posted on: {date.toLocaleString()}</p>
      <p>Votes: {comment.votes + currentVotes}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleDownVote}>DownVote</button>
      {successVote && <p>{successVote}</p>}
      {error && <p id='vote-error'>{error}</p>}
    </div>
  );
}
