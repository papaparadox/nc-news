export default function Article({ article }) {
  console.log(article);
  return (
    <div class='articles'>
      <p>{article.title}</p>
      <img src={article.article_img_url} />
    </div>
  );
}
