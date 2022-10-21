import { Link } from "react-router-dom";
// import { Alert } from "antd";
// import { useEffect } from "react";
import "antd/dist/antd.min.css";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useEffect } from "react";
import { FormValues } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { postNewUser } from "../../store/reducers/user-slice";

function SignUp() {
  const dispatch = useAppDispatch();
  // const status = useAppSelector((state) => state.user.status);
  // валидация формы входа
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      Username: "",
      Email: "",
      password: "",
    },
  });

  // сбор введенных в инпуты данных пользователя + POST-запрос с этими данными
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(postNewUser(data));
    reset();
  };

  // const isAuth = !!localStorage.getItem("token");
  const password = watch("password");
  // const alert = useEffect(() => {
  //   setTimeout(() => {
  //     if (status === "succeeded") {
  //       <Alert
  //         message="Регистрация прошла успешно"
  //         type="success"
  //         style={{ margin: "20px auto" }}
  //       />;
  //     }
  //   }, 1000);
  //   // return clearTimeout(alert);
  // }, [status]);

  console.log("alert", alert);

  return (
    <div className="entry_container">
      <div className="entry_block">
        {/* <> */}
        <form className="entry_block-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="entry_block-header">Create new account</h2>
          <label className="label" htmlFor="username">
            Username
            <input
              {...register("Username", {
                required: "поле обязательно для заполнения",
                minLength: {
                  value: 3,
                  message:
                    "username должен быть от 3 до 20 символов (включительно)",
                },
                maxLength: {
                  value: 20,
                  message:
                    "username должен быть от 3 до 20 символов (включительно)",
                },
              })}
              className="input"
              type="text"
              id="username"
              placeholder="Username"
            />
            <div className="label_error">
              {errors.Username && (
                <p>{errors.Username.message || "*required"}</p>
              )}
            </div>
          </label>
          <label className="label" htmlFor="email">
            Email address
            <input
              {...register("Email", {
                required: "поле обязательно для заполнения",
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
              {errors.Email && <p>{errors.Email.message || "*required"}</p>}
            </div>
          </label>
          <label className="label" htmlFor="password">
            Password
            <input
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message:
                    "password должен быть от 6 до 40 символов (включительно)",
                },
                maxLength: {
                  value: 40,
                  message:
                    "password должен быть от 6 до 40 символов (включительно)",
                },
              })}
              className="input"
              type="password"
              id="password"
              placeholder="Password"
            />
            <div className="label_error">
              {errors.password && (
                <p>{errors.password.message || "*required"}</p>
              )}
            </div>
          </label>
          <label className="label" htmlFor="repeat">
            Repeat password
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
              className="input"
              type="password"
              id="repeat"
              placeholder="Password"
            />
            <div className="label_error">
              {errors.confirmPassword && (
                <p>
                  {errors.confirmPassword?.message || "Пароли не совпадают"}
                </p>
              )}
            </div>
          </label>
          <label className="label label_concent" htmlFor="agreement">
            <span className="label_concent-text">
              I agree to the processing of my personal information
            </span>
            <input
              className="label_concent-input"
              type="checkbox"
              id="agreement"
              required
            />
            <span className="label_concent-checkbox" />
          </label>
          <input className="btn btn-create" type="submit" value="Create" />
          <p>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </form>
        {/* {alert}
        </> */}
        {/* {status === "succeeded" ? (
          <>
            <Alert
              message="Регистрация прошла успешно"
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
              Перейти на страницу{" "}
              <Link to="/sign-in" style={{ color: "blue", cursor: "pointer" }}>
                входа
              </Link>
            </div>
          </>
        ) : null} */}
      </div>
    </div>
  );
}

export default SignUp;
