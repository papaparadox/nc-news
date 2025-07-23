import { Link } from "react-router";

export default function TopicCard({ topic }) {
  return (
    <div className='topic-card'>
      <Link to={`/${topic.slug}/articles`}>
        <h1 id='topic-heading'>{topic.slug}</h1>
      </Link>
      <p>{topic.description}</p>
    </div>
  );
}
