import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import ErrorComponent from "./ErrorComponent";

export default function ListOfTopics() {
  const [topics, setTopics] = useState([]);
  const [pathError, setPathError] = useState(null);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopics(topics);
      })
      .catch((err) => {
        setPathError(err);
      });
  }, []);

  if (pathError) {
    return <ErrorComponent message={pathError.message} />;
  }

  return (
    <main className='list-of-topics'>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </main>
  );
}
