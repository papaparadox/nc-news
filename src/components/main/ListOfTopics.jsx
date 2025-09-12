import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import ErrorComponent from "./ErrorComponent";

export default function ListOfTopics() {
  const [topics, setTopics] = useState([]);
  const [pathError, setPathError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setLoading(false)
      })
      .catch((err) => {
        setPathError(err);
      });
  }, []);

  if (pathError) {
    return <ErrorComponent message={pathError.message} />;
  }
  if(isLoading) {
    return <div id='loading-screen'><h1>Loading...Might take up to 1 minute !</h1></div>
  }

  return (
    <main className='list-of-topics'>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </main>
  );
}
