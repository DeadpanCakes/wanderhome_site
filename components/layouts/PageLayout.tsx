import React, { useState } from "react";

const PageLayout = ({ pages, pageValidity }) => {
  const [currPage, setPage] = useState(1);
  const nextPage = () => setPage((currPage) => currPage + 1);
  const prevPage = () => setPage((currPage) => currPage - 1);
  const onFirstPage = () => currPage < 2;
  const onLastPage = () => currPage >= pages.length;
  const currPageIsValid = () => pageValidity[currPage - 1];
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
            if (!onLastPage() && currPageIsValid()) {
              nextPage();
            }
          }}
          disabled={onLastPage() || !currPageIsValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageLayout;
