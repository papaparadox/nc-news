import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router";
import ArticleCard from "./ArticleCard";
import { getArticles, getArticlesByTopic } from "../api";

export default function ListOfArticles() {
  const [articles, SetArticles] = useState([]);
  const { topic_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pathError, setPathError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    if (!topic_name) {
      getArticles(sortBy, order)
        .then(({ articles }) => {
          SetArticles(articles);
          setIsLoading(false);
        })
        .catch((err) => {
          setPathError(err);
        });
    } else {
      getArticlesByTopic(topic_name, sortBy, order)
        .then(({ articles }) => {
          SetArticles(
            articles.filter((article) => article.topic === topic_name)
          );
          setIsLoading(false);
        })
        .catch((err) => {
          setPathError(err);
        });
    }
  }, [sortBy, order]);

  function handleSortChange(event) {
    const newSort = event.target.value;
    setSearchParams({ sort_by: newSort, order });
  }

  function handleOrderChange() {
    const newOrder = order === "asc" ? "desc" : "asc";
    setSearchParams({ sort_by: sortBy, order: newOrder });
  }

  if(isLoading) {//Add a spinner - TODO
    return <div id='loading-screen'><h1>Loading...Might take up to 1 minute !</h1></div>
  }

  if (pathError) {
    return <ErrorComponent message={pathError.message} />;
  }

  return (
    <div className='select-sorting'>
      <select value={sortBy} onChange={handleSortChange}>
        <option value='created_at'>Newest</option>
        <option value='votes'>Most Votes</option>
        <option value='comment_count'>Most Comments</option>
      </select>
      <button onClick={handleOrderChange}>
        {order === "asc" ? "Descending" : "Ascending"}
      </button>
      <section className='articles-section'>
        {articles.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </section>
    </div>
  );
}
