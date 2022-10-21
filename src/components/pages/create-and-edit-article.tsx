/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewArticleType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  publishArticle,
  updateArticle,
} from "../../store/reducers/user-article-slice";

function CreateAndEditArticle() {
  const dispatch = useAppDispatch();
  const token = JSON.parse(localStorage.getItem("token")!);
  const article = useAppSelector((state) => state.posts.article);
  const slug = article?.slug;
  const isEdit = useAppSelector((state) => state.article.isEdit);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewArticleType>({
    mode: "onChange",
  });

  const headerName = isEdit ? `Edit article` : `Create new article`;
  const onSubmit: SubmitHandler<NewArticleType> = ({
    title,
    description,
    text,
    tags,
  }) => {
    console.log(
      "in create incoming data",
      title,
      description,
      text,
      slug,
      token,
    );
    if (!isEdit) {
      dispatch(publishArticle({ title, description, text, tags, token }));
      reset();
    }
    if (isEdit) {
      dispatch(updateArticle({ title, description, text, slug, token }));
      reset();
    }
  };

  // обнуление полей при открытии страницы create new article:
  useEffect(() => {
    if (!isEdit) {
      reset({
        title: "",
        description: "",
        text: "",
      });
    }
  }, [isEdit, reset]);

  return (
    <div className="new_article_wrapper">
      <div className="article new_article">
        <form className="entry_block-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="entry_block-header">{headerName}</h2>
          <label className="label" htmlFor="title">
            Title
            <input
              {...register("title", {
                required: "поле обязательно для заполнения",
              })}
              className="input"
              type="text"
              id="title"
              placeholder="Title"
              defaultValue={isEdit ? article?.title : ""}
            />
            <div className="label_error">
              {errors.title && <p>{errors.title.message}</p>}
            </div>
          </label>
          <label className="label" htmlFor="description">
            Short description
            <input
              {...register("description", {
                required: "поле обязательно для заполнения",
              })}
              className="input"
              type="text"
              id="description"
              placeholder="Short description"
              defaultValue={slug !== undefined ? article?.description : ""}
            />
            <div className="label_error">
              {errors.description && <p>{errors.description.message}</p>}
            </div>
          </label>
          <label className="label" htmlFor="fulltext">
            Text
            <textarea
              {...register("text", {
                required: "поле обязательно для заполнения",
              })}
              cols={80}
              rows={30}
              className="input"
              id="fulltext"
              placeholder="Text"
              defaultValue={slug !== undefined ? article?.body : ""}
            />
            <div className="label_error">
              {errors.text && <p>{errors.text.message}</p>}
            </div>
          </label>
          <div className="new_article-tags">
            <label className="label" htmlFor="tags">
              <span>Tags</span>
              <div className="label_inputs">
                <input
                  {...register("tags")}
                  className="input"
                  type="text"
                  id="tags"
                  placeholder="Tag"
                />
                <div className="new_article-buttons">
                  <input
                    className="btn btn-delete"
                    type="button"
                    value="Delete"
                  />
                  <input
                    className="btn btn-add"
                    type="button"
                    value="Add tag"
                  />
                </div>
              </div>
            </label>
            <input
              className="btn btn-sent"
              type="submit"
              value="Send"
              onClick={() => navigate("/")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAndEditArticle;
