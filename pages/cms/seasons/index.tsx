import { useState } from "react";
import ChildList from "../../../components/ChildList";
import APIForm from "../../../components/forms/APIForm";

const Seasons = (props) => {
  const seasons = JSON.parse(props.seasons);
  const [season, setSeason] = useState({
    name: "",
  });
  return (
    <>
      <APIForm
        payload={season}
        changeHandler={setSeason}
        url="/api/seasons/"
        method="POST"
      />
      <ChildList
        category="Seasons"
        childArray={seasons}
        baseURL="/cms/seasons"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + "seasons/";
  const response = await fetch(url);
  const seasons = JSON.stringify(await response.json());
  return { props: { seasons } };
};

export default Seasons;
