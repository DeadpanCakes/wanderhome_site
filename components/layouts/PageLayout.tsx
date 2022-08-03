import { useState } from "react";

const PageLayout = ({ pages }) => {
  const [currPage, setPage] = useState(1);
  const nextPage = () => setPage((currPage) => currPage + 1);
  const prevPage = () => setPage((currPage) => currPage - 1);
  const onFirstPage = () => currPage < 2;
  const onLastPage = () => currPage >= pages.length;
  return (
    <div>
      {pages[currPage - 1]}
      <div>
        <button
          onClick={() => {
            if (!onFirstPage()) {
              prevPage();
            }
          }}
          disabled={onFirstPage()}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (!onLastPage()) {
              nextPage();
            }
          }}
          disabled={onLastPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageLayout;
