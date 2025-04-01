import { Link } from "react-router";

export default function ArticleCard({ article }) {
  const toArticle = `/articles/${article.article_id}`;
  return (
    <Link to={toArticle}>
      <div className='articles'>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} id='article-card-image' />
      </div>
    </Link>
  );
}
