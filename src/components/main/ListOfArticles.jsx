import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { getArticles, getArticlesByTopic } from "../api";
import { useParams } from "react-router";

export default function ListOfArticles() {
  const [articles, SetArticles] = useState([]);
  const { topic_name } = useParams();

  useEffect(() => {
    if (!topic_name) {
      getArticles().then(({ articles }) => {
        SetArticles(articles);
      });
    } else {
      getArticlesByTopic(topic_name).then(({ articles }) => {
        SetArticles(articles.filter((article) => article.topic === topic_name));
      });
    }
  }, []);

  return (
    <section className='articles-section'>
      {articles.map((article) => {
        return <ArticleCard key={article.title} article={article} />;
      })}
    </section>
  );
}
