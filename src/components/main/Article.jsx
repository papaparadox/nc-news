export default function Article({ article }) {
  console.log(article);
  return (
    <div class='articles'>
      <h3>{article.title}</h3>
      <img src={article.article_img_url} />
    </div>
  );
}
