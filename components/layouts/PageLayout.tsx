import React, { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

interface Props {
  pages: React.ReactNode[];
  pageValidity?: boolean[];
}

const PageLayout = ({ pages, pageValidity }: Props) => {
  const [currPage, setPage] = useState(1);
  const nextPage = () => setPage((currPage) => currPage + 1);
  const prevPage = () => setPage((currPage) => currPage - 1);
  const onFirstPage = () => currPage < 2;
  const onLastPage = () => currPage >= pages.length;
  const currPageIsValid = () => pageValidity[currPage - 1];
  const { activeTheme } = useContext(ThemeContext);
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
          style={{
            color: activeTheme.fore,
            border: `2px solid ${activeTheme.fore}`,
          }}
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
          style={{
            color: activeTheme.fore,
            border: `2px solid ${activeTheme.fore}`,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageLayout;
