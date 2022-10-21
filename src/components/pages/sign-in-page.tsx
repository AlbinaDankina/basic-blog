/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import "antd/dist/antd.min.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/reducers/user-slice";
import { SignupType } from "../../types/types";

function SignIn() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token")!);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignupType>({
    mode: "onChange",
  });

  // производим запрос на проверку регистрационных данных и если все ок, то навигируем пользователя на залогиненную гл страницу
  const onSubmit: SubmitHandler<SignupType> = ({ Email, password }) => {
    dispatch(loginUser({ Email, password, token }));
    // dispath(getUser)
    reset();
  };

  if (isLoggedIn) navigate("/");
  return (
    <div className="entry_container">
      <div className="entry_block">
        <form className="entry_block-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="entry_block-header">Sign In</h2>
          <label className="label" htmlFor="email">
            Email address
            <input
              {...register("Email", {
                required: "необходимо заполнить",
                minLength: 6,
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: "email должен быть корректным почтовым адресом",
                },
              })}
              style={{
                border:
                  errors.Email && status === "failed"
                    ? "0.5px solid red"
                    : "0.5px solid green",
              }}
              className="input"
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
            <div className="label_error">
              {errors.Email && <p>{errors.Email.message || "*required"}</p>}
            </div>
          </label>
          <label className="label" htmlFor="password">
            Password
            <input
              {...register("password", {
                required: "необходимо заполнить",
                minLength: 1,
              })}
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <div className="label_error">
              {errors.password && (
                <p>{errors.password.message || "*required"}</p>
              )}
            </div>
          </label>
          <input
            disabled={!isValid}
            className="btn btn-create"
            type="submit"
            value="Login"
          />
          <p>
            Dont't have an account?
            <Link to="/sign-up">Sign up</Link>
          </p>
        </form>
        {status === "failed" ? (
          <Alert
            message="Неверные пользовательские данные."
            type="error"
            style={{
              margin: "20px auto",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SignIn;
