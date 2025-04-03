import {
  downVoteArticleVotes,
  getArticleByID,
  updateArticleVotes,
} from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListOfComments from "./ListOfComments";
import ErrorComponent from "./ErrorComponent";

export default function ArticleById() {
  const [articleWithID, setArticleWithID] = useState([]);
  const [currentArticleVotes, setCurrentArticleVotes] = useState(0);
  const [isVoteClicked, setIsVoteClicked] = useState(false);
  const [isDownVoteClicked, setIsDownVoteClicked] = useState(false);
  const [successVote, setSuccessVote] = useState(null);
  const { article_id } = useParams();

  const [error, setError] = useState(null);
  const [pathError, setPathError] = useState(null);

  function handleVote() {
    if (!isVoteClicked && !error) {
      updateArticleVotes(article_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentArticleVotes((prev) => prev - 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentArticleVotes(currentArticleVotes + 1);
      setIsVoteClicked(true);
      setSuccessVote("The post was upvoted!");
    } else {
      downVoteArticleVotes(article_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentArticleVotes((prev) => prev + 1);
          setError("Failed to vote. Try again!");
        });
      setCurrentArticleVotes(currentArticleVotes - 1);
      setIsVoteClicked(false);
      error ? setSuccessVote("") : setSuccessVote("Vote was retrieved!");
    }
  }
  function handleDownVote() {
    if (!isDownVoteClicked && !error) {
      downVoteArticleVotes(article_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentArticleVotes((prev) => prev + 1);
          setSuccessVote("");
          setError("Failed to vote. Try again!");
        });
      setCurrentArticleVotes(currentArticleVotes - 1);
      setIsDownVoteClicked(true);
      setSuccessVote("The post was downvoted!");
    } else {
      updateArticleVotes(article_id)
        .then(() => {
          setError(null);
        })
        .catch(() => {
          setCurrentArticleVotes((prev) => prev - 1);
          setSuccessVote("");
          setError("Failed to vote. Try again!");
        });
      setCurrentArticleVotes(currentArticleVotes + 1);
      setIsDownVoteClicked(false);
      error ? setSuccessVote("") : setSuccessVote("Downvote was retrieved!");
    }
  }

  useEffect(() => {
    getArticleByID(article_id)
      .then(({ article }) => {
        setArticleWithID(article);
      })
      .catch((err) => {
        setPathError(err);
      });
  }, []);

  if (pathError) {
    return <ErrorComponent message={pathError.message} />;
  }
  return (
    <div>
      <h1>{articleWithID.title}</h1>
      <img src={articleWithID.article_img_url} id='article-id-image' />
      <article>{articleWithID.body}</article>
      <p>Votes: {articleWithID.votes + currentArticleVotes}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleDownVote}>DownVote</button>
      {successVote && <p>{successVote}</p>}
      {error && <p id='vote-error'>{error}</p>}
      <p>
        Post made by <span id='author'>{articleWithID.author}</span>
      </p>
      <ListOfComments article_id={article_id} />
    </div>
  );
}
