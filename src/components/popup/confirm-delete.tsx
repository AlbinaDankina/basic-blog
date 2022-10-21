import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  showModal,
  deleteArticle,
} from "../../store/reducers/user-article-slice";
import "./confirm-delete.scss";

function ConfirmDelete() {
  // const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  // const article = useAppSelector((state) => state.posts.article);
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.posts.article);
  const slug = article?.slug;
  const token = JSON.parse(localStorage.getItem("token")!);
  const isModalVisible = useAppSelector(
    (state) => state.article.isModalVisible,
  );

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
          onClick={() => dispatch(deleteArticle({ slug, token }))}
        />
      </div>
    </div>
  );
}

export default ConfirmDelete;
