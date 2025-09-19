import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";
import ErrorComponent from "./ErrorComponent";
import { SpinnerCircular } from "spinners-react";

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
         return (
          <div className='spinner-container'>
            <SpinnerCircular size={125} color="#3498db" enabled={true} />
            <p id='spinner-text'>Loading a free database...</p>
          </div>
        );
  }

  return (
    <main className='list-of-topics'>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </main>
  );
}
