/* eslint-disable react-hooks/rules-of-hooks */
import uniqid from "uniqid";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { showModal, underEdit } from "../../store/reducers/user-article-slice";
import ConfirmDelete from "../popup/confirm-delete";
import profilePic from "./img/alternative.jpg";
import {
  likePost,
  dislikePost,
  fetchArticle,
} from "../../store/reducers/post-slice";

function ArticleContent() {
  const favorited = useAppSelector((state) => state.posts.favorited);
  const favoritesCount = useAppSelector((state) => state.posts.favoritesCount);
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug?: string | undefined }>();
  useEffect(() => {
    dispatch(fetchArticle(slug!));
  }, [favoritesCount]);
  const user = useAppSelector((state) => state.user.Username);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const article = useAppSelector((state) => state.posts.article);
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

  // функционал лайков - дублируется в компоненте article,
  // т.к.из - за присутствия dispatch не вынести логику в отдельный файл
  const toggleLike = () => {
    if (favorited === false) {
      dispatch(likePost(slug!));
    }
    if (favorited === true) {
      dispatch(dislikePost(slug!));
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <div className="article">
        <div className="article_wrapper">
          <div className="article_content">
            <div className="article_content-wrapper">
              <div className="articles_item-content-header">
                <h2>{article?.title}</h2>
                <button
                  onClick={toggleLike}
                  className="articles_item-content-likes"
                  type="button"
                >
                  {article?.favoritesCount}
                </button>
              </div>
              <div className="articles_item-content-tags">{tagUnit}</div>
            </div>
            <div className="articles_item-user user">
              <div>
                <div className="user_name">{article?.author.username}</div>
                <div className="user_feedback-date">{`${month} ${day}, ${year}`}</div>
              </div>
              <div className="user_photo">
                <img
                  src={article?.author.image || profilePic}
                  alt=""
                  className="user_photo"
                />
              </div>
            </div>
          </div>
          {isLoggedIn && user === article.author.username ? (
            <>
              <div className="article_content-buttons">
                <input
                  className="btn btn-delete"
                  type="button"
                  value="Delete"
                  onClick={() => dispatch(showModal())}
                />
                <Link to={`/articles/:${slug}/edit`}>
                  <button
                    className="btn btn-add btn-edit"
                    type="button"
                    value="Edit"
                    onClick={() => dispatch(underEdit())}
                  >
                    Edit
                  </button>
                </Link>
              </div>
              <ConfirmDelete />
            </>
          ) : null}
          <ReactMarkdown>{article?.body!}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
