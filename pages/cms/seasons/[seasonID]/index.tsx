import React, { useRouter } from "next/router";
import { useState } from "react";
import ChildList from "../../../../components/ChildList";
import APIForm from "../../../../components/forms/APIForm";

const Season = (props) => {
  const season = JSON.parse(props.season);
  const router = useRouter();
  console.log(season);
  const [month, setMonth] = useState({
    name: "",
    description: "",
    season: season.id,
  });
  const [holiday, setHoliday] = useState({
    name: "",
    description: "",
    season: season.id,
  });
  return (
    <>
      <h1>{season.name}</h1>
      <ChildList
        category="months"
        childArray={season.month_set}
        baseURL={router.asPath + "/month"}
      />
      <APIForm
        payload={month}
        method="POST"
        changeHandler={setMonth}
        url="/api/seasons/months"
      />
      <ChildList
        category="holidays"
        childArray={season.holiday_set}
        baseURL={router.asPath + "/holiday"}
      />
      <APIForm
        payload={holiday}
        changeHandler={setHoliday}
        method="POST"
        url="/api/seasons/holidays"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `seasons/${context.params.seasonID}/`;
  const response = await fetch(url);
  const season = await response.json();
  return { props: { season: JSON.stringify(season) } };
};

export default Season;
