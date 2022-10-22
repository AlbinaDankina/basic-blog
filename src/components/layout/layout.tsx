import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  logOut,
  logIn,
  getLoggedInUser,
} from "../../store/reducers/user-slice";
import "./layout.scss";
import { underCreate } from "../../store/reducers/user-article-slice";
import profilePic from "../pages/img/alternative.jpg";

function Layout() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const name = useAppSelector((state) => state.user.Username);
  const avatarSrc = useAppSelector((state) => state.user.avatar);

  // залогинивание пользователя при f5
  const isAuth = !!localStorage.getItem("token");
  useEffect(() => {
    if (isAuth) {
      dispatch(logIn());
      dispatch(getLoggedInUser());
    }
  }, [isAuth]);

  // вид для залогиненного пользователя
  if (isLoggedIn) {
    return (
      <>
        <header className="header height_loggedIn">
          <menu className="header_menu">
            <div className="header_logo">
              <span>
                <Link to="/">Realworld blog</Link>
              </span>
            </div>
            <div className="header_profile">
              <button
                className="header_btn"
                type="button"
                onClick={() => dispatch(underCreate())}
              >
                <Link to="/new-article">
                  <span>Create Article</span>
                </Link>
              </button>
              <div className="header_user">{name}</div>
              <Link to="/profile">
                <img
                  src={avatarSrc || profilePic}
                  alt=""
                  className="user_photo"
                />
              </Link>
              <button
                className="header_btn"
                type="button"
                onClick={() => dispatch(logOut())}
              >
                <Link to="/">
                  <span>Log out</span>
                </Link>
              </button>
            </div>
          </menu>
        </header>
        <Outlet />
      </>
    );
  }

  // вид для незалогиненного пользователя
  return (
    <>
      <header className="header">
        <menu className="header_menu">
          <div className="header_logo">
            <span>
              <Link to="/">Realworld blog</Link>
            </span>
          </div>
          <div>
            <button className="header_btn" type="button">
              <Link to="sign-in">Sign In</Link>
            </button>
            <button className="header_btn" type="button">
              <Link to="sign-up">Sign Up</Link>
            </button>
          </div>
        </menu>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
