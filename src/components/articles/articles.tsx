import uniqid from "uniqid";
import Article from "../pages/article";
import { useAppSelector } from "../../store/hooks";
import "./articles.scss";
import Pagination from "../pagination/pagination";

function Articles() {
  const posts = useAppSelector((state) => state.posts.articles);
  const post = posts.map((item) => {
    return <Article key={uniqid()} item={item} />;
  });

  return (
    <>
      <div className="articles_main-wrapper">
        <div className="articles_wrapper">
          <ul className="articles">{post}</ul>
        </div>
      </div>

      <Pagination />
    </>
  );
}

export default Articles;
