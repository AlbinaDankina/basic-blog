import uniqid from "uniqid";
import "./pages.scss";
import { Link } from "react-router-dom";
import { ArticleType } from "../../types/types";
// import { truncate } from "../../logic/truncate-text";
import { useAppDispatch } from "../../store/hooks";
import { fetchArticle } from "../../store/reducers/post-slice";

function Article({ item }: { item: ArticleType }) {
  const dispatch = useAppDispatch();

  const year = new Date(item.updatedAt).getFullYear();
  const day = new Date(item.updatedAt).getDate();
  const month = new Date(item.updatedAt).toLocaleString("default", {
    month: "long",
  });

  const tagUnit = item.tagList.map((el) => (
    <div key={uniqid()} className="articles_item-content-tags-item">
      {el}
    </div>
  ));

  return (
    <li className="articles_item">
      <div className="articles_item-content">
        <div className="articles_item-content-header">
          <Link
            to={`articles/${item.slug}`}
            onClick={() => dispatch(fetchArticle(item.slug))}
          >
            <h2>{item.title ? item.title : <span>Без названия</span>}</h2>
          </Link>
          <div className="articles_item-content-likes">12</div>
        </div>
        <div className="articles_item-content-tags">{tagUnit}</div>
        {/* <p className="articles_item-content-text">{truncate(item.body)}</p> */}
        <p className="articles_item-content-text">{item.body}</p>
      </div>
      <div className="articles_item-user user">
        <div>
          <div className="user_name">{item.author.username}</div>
          <div className="user_feedback-date">{`${month} ${day}, ${year}`}</div>
        </div>
        <div className="user_photo">
          <img src={item.author.image} alt="" className="user_photo" />
        </div>
      </div>
    </li>
  );
}

export default Article;
