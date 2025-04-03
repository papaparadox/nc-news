import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router";
import ArticleCard from "./ArticleCard";
import { getArticles, getArticlesByTopic } from "../api";

export default function ListOfArticles() {
  const [articles, SetArticles] = useState([]);
  const { topic_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    if (!topic_name) {
      getArticles(sortBy, order).then(({ articles }) => {
        SetArticles(articles);
      });
    } else {
      getArticlesByTopic(topic_name, sortBy, order).then(({ articles }) => {
        SetArticles(articles.filter((article) => article.topic === topic_name));
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
  return (
    <>
      <select value={sortBy} onChange={handleSortChange}>
        <option value='created_at'>Newest</option>
        <option value='votes'>Most Votes</option>
        <option value='comment_count'>Most Comments</option>
      </select>
      <button onClick={handleOrderChange}>{order}</button>
      <section className='articles-section'>
        {articles.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </section>
    </>
  );
}
