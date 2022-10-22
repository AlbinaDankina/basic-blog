/* eslint-disable no-plusplus */
import uniqid from "uniqid";
import { useEffect } from "react";
import { fetchPosts } from "../../store/reducers/post-slice";
import Article from "../pages/article";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./articles.scss";
import Pagination from "../pagination/pagination";
import Spinner from "../spinner/spinner";

function Articles() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts?.articles);
  const status = useAppSelector((state) => state.posts.status);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const post = posts.map((item) => {
    return <Article key={uniqid()} item={item} />;
  });
  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div className="articles_main-wrapper">
      <div className="articles_wrapper">
        {status === "resolved" ? (
          <>
            <ul className="articles">{post}</ul>
            <Pagination />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Articles;
