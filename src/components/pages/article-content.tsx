import ReactMarkdown from "react-markdown";
import { useAppSelector } from "../../store/hooks";

function ArticleContent() {
  const article = useAppSelector((state) => state.posts.article);
  const tagUnit = article?.tagList.map((el) => (
    <div className="articles_item-content-tags-item">{el}</div>
  ));
  const year = new Date(article!.updatedAt).getFullYear();
  const day = new Date(article!.updatedAt).getDate();
  const month = new Date(article!.updatedAt).toLocaleString("default", {
    month: "long",
  });
  return (
    <div className="article">
      <div className="article_wrapper">
        <div className="article_content">
          <div className="article_content-wrapper">
            <div className="articles_item-content-header">
              <h2>{article?.title}</h2>
              <div className="articles_item-content-likes">12</div>
            </div>
            <div className="articles_item-content-tags">{tagUnit}</div>
          </div>
          <div className="articles_item-user user">
            <div>
              <div className="user_name">{article?.author.username}</div>
              <div className="user_feedback-date">{`${month} ${day}, ${year}`}</div>
            </div>
            <div className="user_photo">
              <img src={article?.author.image} alt="" className="user_photo" />
            </div>
          </div>
        </div>
        <ReactMarkdown>{article?.body!}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticleContent;
