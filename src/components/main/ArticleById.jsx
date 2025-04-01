import { getArticleByID } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListOfComments from "./ListOfComments";

export default function ArticleById() {
  const [articleWithID, setArticleWithID] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleByID(article_id).then(({ article }) => {
      setArticleWithID(article);
    });
  }, []);

  return (
    <div>
      <h1>{articleWithID.title}</h1>
      <img src={articleWithID.article_img_url} id='article-id-image' />
      <article>{articleWithID.body}</article>
      <p>
        Post made by <span id='author'>{articleWithID.author}</span>
      </p>
      <ListOfComments article_id={article_id} />
    </div>
  );
}
