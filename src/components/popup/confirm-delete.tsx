import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  showModal,
  deleteArticle,
} from "../../store/reducers/user-article-slice";
import "./confirm-delete.scss";

function ConfirmDelete() {
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.posts.article);
  const slug = article?.slug;
  const token = JSON.parse(localStorage.getItem("token")!);
  const navigate = useNavigate();

  // таймер, чтобы модалка не висела при переходе от стр к стр,
  // если пользователь ничего на ней не нажал
  const isModalVisible = useAppSelector(
    (state) => state.article.isModalVisible,
  );
  if (isModalVisible) {
    setTimeout(() => dispatch(showModal()), 2000);
  }

  return (
    <div className={isModalVisible ? "modal active" : "modal"}>
      <div className="modal_content">Are you sure to delete this article?</div>
      <div className="modal_buttons new_article-buttons">
        <input
          className="btn btn-reject"
          type="button"
          value="No"
          onClick={() => dispatch(showModal())}
        />
        <input
          className="btn btn-condirm"
          type="button"
          value="Yes"
          onClick={() => {
            dispatch(deleteArticle({ slug, token }));
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

export default ConfirmDelete;
