import { Routes, Route } from "react-router-dom";
import Articles from "../articles/articles";
import ArticleContent from "../pages/article-content";
import Layout from "../layout/layout";
import NotFoundPage from "../pages/not-found-page";
import SignUp from "../pages/sign-up-page";
import SignIn from "../pages/sign-in-page";
import EditProfile from "../pages/edit-profile-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Articles />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="articles/" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleContent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
