import { Outlet, Link } from "react-router-dom";
import "./layout.scss";

function Layout() {
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
