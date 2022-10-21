/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { FormValues } from "../../types/types";
import "antd/dist/antd.min.css";
import { editProfile } from "../../store/reducers/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function EditProfile() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const item: JSX.Element | null = null;
  const token = JSON.parse(localStorage.getItem("token")!);
  const updateStatus = useAppSelector((state) => state.user.updateStatus);

  // сбор введенных в инпуты данных пользователя + POST-запрос с этими данными
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { Username, Email, password, avatar } = data;
    dispatch(editProfile({ Username, Email, password, avatar, token }));
    reset();
    return item;
  };

  return (
    <div className="entry_container">
      <div className="entry_block">
        <form className="entry_block-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="entry_block-header">Edit Profile</h2>
          <label className="label" htmlFor="username">
            Username
            <input
              {...register("Username", {
                required: "необходимо заполнить",
                minLength: {
                  value: 3,
                  message:
                    "username не может быть пустым: должен содержать от 3 до 20 символов",
                },
                maxLength: {
                  value: 20,
                  message:
                    "username не может быть пустым: должен содержать от 3 до 20 символов",
                },
              })}
              className="input"
              type="text"
              id="username"
              placeholder="Username"
            />
            <div className="label_error">
              {errors.Username && <p>{errors.Username.message}</p>}
            </div>
          </label>
          <label className="label" htmlFor="email">
            Email address
            <input
              {...register("Email", {
                required: "необходимо заполнить",
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: "email должен быть корректным почтовым адресом",
                },
              })}
              className="input"
              type="email"
              id="email"
              placeholder="Email address"
            />
            <div className="label_error">
              {errors.Email && <p>{errors.Email.message}</p>}
            </div>
          </label>
          <label className="label" htmlFor="password">
            New Password
            <input
              {...register("password", {
                required: "необходимо заполнить",
                minLength: {
                  value: 6,
                  message: "пароль должен быть от 6 до 40 символов",
                },
                maxLength: {
                  value: 40,
                  message: "пароль должен быть от 6 до 40 символов",
                },
              })}
              className="input"
              type="password"
              id="password"
              placeholder="Password"
            />
            <div className="label_error">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </label>
          <label className="label" htmlFor="avatar">
            Avatar image (url)
            <input
              {...register("avatar", {
                required: "необходимо заполнить",
                pattern: {
                  value: /(https?:\/\/.*\.(?:png|jpg))/i,
                  message: "URL должен быть корректным",
                },
              })}
              className="input"
              type="password"
              id="avatar"
              placeholder="Avatar image"
            />
            <div className="label_error">
              {errors.avatar && <p>{errors.avatar.message}</p>}
            </div>
          </label>
          <input className="btn btn-create" type="submit" value="Save" />
        </form>
        {item}
        {updateStatus === "succeeded" ? (
          <>
            <Alert
              message="Данные успешно обновлены"
              type="success"
              style={{ margin: "20px auto" }}
            />
            <div
              style={{
                margin: "20px auto",
                color: "black",
                fontSize: "14px",
                fontWeight: "500",
                width: "280px",
              }}
            >
              Перейти{" "}
              <Link to="/" style={{ color: "blue", cursor: "pointer" }}>
                на главную страницу
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default EditProfile;
