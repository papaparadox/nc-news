import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard";

export default function ListOfTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);
  return (
    <main className='list-of-topics'>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </main>
  );
}
