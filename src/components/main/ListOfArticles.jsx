import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";

export default function ListOfArticles() {
  const [articles, SetArticles] = useState([]);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      SetArticles(articles);
    });
  }, []);

  return (
    <section className='articles-section'>
      {articles.map((article) => {
        return <ArticleCard key={article.title} article={article} />;
      })}
    </section>
  );
}
