import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logOut } from "../../store/reducers/user-slice";
// import Spinner from "../spinner";
import "./layout.scss";

function Layout() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const name = useAppSelector((state) => state.user.Username);
  const avatarSrc = useAppSelector((state) => state.user.avatar);
  console.log("isLoggedIn", isLoggedIn);
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // const areArticlesLoaded = useAppSelector((state) => state.posts.status);
  const isAuth = localStorage.getItem("token");
  if (isAuth && isLoggedIn === true) {
    return (
      <>
        <header className="header">
          <menu className="header_menu">
            <div className="header_logo">
              <span>
                <Link to="/">Realworld blog</Link>
              </span>
            </div>
            <div className="header_profile">
              <button className="header_btn" type="button">
                <span>Create Article</span>
              </button>
              <div className="header_user">{name}</div>
              <Link to="/profile">
                <img
                  src={avatarSrc !== null ? avatarSrc : "./profile.png"}
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

        {/* {areArticlesLoaded ? <Outlet /> : <Spinner />} */}
        {/* <Spinner /> */}
        <Outlet />
      </>
    );
  }

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
