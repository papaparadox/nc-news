export default function CommentCard({ comment }) {
  const date = new Date(comment.created_at);
  return (
    <div className='comments'>
      <h4>{comment.author} writes:</h4>
      <p>{comment.body}</p>
      <p>Posted on: {date.toLocaleString()}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
}
