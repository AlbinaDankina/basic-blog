import { Routes, Route } from "react-router-dom";
import Articles from "../articles/articles";
import ArticleContent from "../pages/article-content";
import Layout from "../layout/layout";
import NotFoundPage from "../pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Articles />} />
        <Route path="articles/" element={<Articles />} />
        <Route index path=":slug" element={<ArticleContent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
