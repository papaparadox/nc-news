import { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";

export default function ListOfArticles() {
  const [articles, SetArticles] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://seeding-ncnews.onrender.com/api",
    });
    api.get("/articles").then(({ data }) => {
      console.log(data.articles);
      SetArticles(data.articles);
    });
  }, []);
  return (
    <section class='articles-section'>
      {articles.map((article) => {
        return <Article key={article.title} article={article} />;
      })}
    </section>
  );
}
