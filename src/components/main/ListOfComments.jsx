import { useState, useEffect } from "react";
import { getComments } from "../api";
import CommentCard from "./CommentCard";

export default function ListOfComments({ article_id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(article_id).then(({ comment }) => {
      setComments(comment);
    });
  }, []);
  return (
    <section className='comment-section'>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}
