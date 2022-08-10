import React from "react";
import Link from "next/link";

const AddBtn = ({ text, href }) => {
  return (
    <Link href={href}>
      <button>
        <a>{text}</a>
      </button>
    </Link>
  );
};

export default AddBtn;
