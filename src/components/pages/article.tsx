import uniqid from "uniqid";
import "./pages.scss";
import { Link } from "react-router-dom";
import { ArticleType } from "../../types/types";
import { truncate } from "../../logic/truncate-text";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { likePost, dislikePost } from "../../store/reducers/post-slice";

function Article({ item }: { item: ArticleType }) {
  const dispatch = useAppDispatch();
  const favorited = useAppSelector((state) => state.posts.favorited);
  const likes = useAppSelector((state) => state.posts.likes);
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

  // функционал лайков - дублируется в компоненте articleContent,
  // т.к.из - за присутствия dispatch не вынести логику в отдельный файл
  const toggleLike = () => {
    if (favorited === false) {
      dispatch(likePost(item.slug));
    }
    if (favorited === true) {
      dispatch(dislikePost(item.slug));
    }
  };

  return (
    <li className="articles_item">
      <div className="articles_item-content">
        <div className="articles_item-content-header">
          <Link to={`articles/${item.slug}`}>
            <h2>{item.title ? item.title : <span>Без названия</span>}</h2>
          </Link>
          <button
            onClick={toggleLike}
            className="articles_item-content-likes"
            type="button"
          >
            {likes[item.slug]}
          </button>
        </div>
        <div className="articles_item-content-tags">{tagUnit}</div>
        <p className="articles_item-content-text">{truncate(item.body)}</p>
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
