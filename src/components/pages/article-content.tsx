import uniqid from "uniqid";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function ArticleContent() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const article = useAppSelector((state) => state.posts.article);
  const { slug } = useParams();
  console.log("SLUG", slug);
  const tagUnit = article?.tagList.map((el) => (
    <div key={uniqid()} className="articles_item-content-tags-item">
      {el}
    </div>
  ));
  if (!article?.updatedAt) return null;
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
        {isLoggedIn ? (
          <div className="article_content-buttons">
            <input className="btn btn-delete" type="button" value="Delete" />
            <Link to={`/articles/:${slug}/edit`}>
              <input
                className="btn btn-add btn-edit"
                type="button"
                value="Edit"
              />
            </Link>
          </div>
        ) : null}
        <ReactMarkdown>{article?.body!}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticleContent;
