import uniqid from "uniqid";
// import { useEffect } from "react";
import {
  // fetchPosts,
  setCurrentPage,
  setPrevPage,
  setNextPage,
} from "../../store/reducers/post-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import createPages from "../../logic/create-pages";

function Pagination() {
  const dispatch = useAppDispatch();

  const btn1 = "<";
  const btn2 = ">";
  const articlesCount = useAppSelector((state) => state.posts.articlesCount);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const pages: number[] | any[] = [];
  createPages(pages, articlesCount, currentPage);

  return (
    <div className="pages">
      <button
        className="pageBtn"
        type="button"
        onClick={() => dispatch(setPrevPage(currentPage))}
      >
        {" "}
        {btn1}{" "}
      </button>
      {pages.map((page: number) => (
        <button
          key={uniqid()}
          type="button"
          className={currentPage === page ? "current-page" : "page"}
          onClick={() => dispatch(setCurrentPage(page))}
        >
          {page}
        </button>
      ))}
      <button
        className="pageBtn"
        type="button"
        onClick={() => dispatch(setNextPage(currentPage))}
      >
        {" "}
        {btn2}{" "}
      </button>
    </div>
  );
}

export default Pagination;
