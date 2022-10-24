/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { NewArticleType } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  publishArticle,
  updateArticle,
} from "../../store/reducers/user-article-slice";

function CreateAndEditArticle() {
  const dispatch = useAppDispatch();
  // const token = JSON.parse(localStorage.getItem("token")!);
  const article = useAppSelector((state) => state.posts.article);
  const slug = article?.slug;
  const token = JSON.parse(localStorage.getItem("token")!);
  const isEdit = useAppSelector((state) => state.article.isEdit);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NewArticleType>({
    mode: "onChange",
    defaultValues: {
      tags: article?.tagList.map((item) => ({
        value: `${item}`,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });
  const headerName = isEdit ? `Edit article` : `Create new article`;
  // обработка формы
  const onSubmit: SubmitHandler<NewArticleType> = (data) => {
    const { title, description, text, tags } = data;
    // получить из массива объектов tags - массив строк для последующей передачи в запрос на публикацию
    const tagsForSubmit = tags?.map((el) => el.value);

    if (!isEdit) {
      dispatch(
        publishArticle({ title, description, text, tagsForSubmit, token }),
      );
      navigate("/");
      reset();
    }
    if (isEdit) {
      dispatch(
        updateArticle({ title, description, text, slug, tagsForSubmit, token }),
      );
      navigate("/");
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

  if (!isLoggedIn) navigate("/sign-in");

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
            <div className="label">
              <span>Tags</span>
              <div className="label_inputs">
                <div className="new_article-buttons">
                  <input
                    className="btn btn-add"
                    type="button"
                    value="Add tag"
                    onClick={() => {
                      append({ value: "" });
                    }}
                  />
                </div>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="label_inputs">
                  <input
                    {...register(`tags.${index}.value` as const)}
                    className="input"
                    type="text"
                    id="tags"
                    placeholder="Tag"
                    defaultValue={`tags.${index}`}
                  />
                  <div className="new_article-buttons">
                    <input
                      className="btn btn-delete"
                      type="button"
                      value="Delete"
                      onClick={() => remove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <input className="btn btn-sent" type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAndEditArticle;
