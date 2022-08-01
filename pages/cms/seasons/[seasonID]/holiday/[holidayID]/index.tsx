import { useState } from "react";
import { useRouter } from "next/router";
import ChildList from "../../../../../../components/ChildList";
import APIForm from "../../../../../../components/forms/APIForm";

const Holiday = (props) => {
  const holiday = JSON.parse(props.holiday);
  const router = useRouter();
  const [tradition, setTradition] = useState({
    text: "",
    holiday: holiday.id,
  });
  const [move, setMove] = useState({ text: "", holiday: holiday.id });
  const [custom, setCustom] = useState({ text: "", holiday: holiday.id });
  return (
    <>
      <h1>{holiday.name}</h1>
      <p>{holiday.description}</p>
      <ChildList
        category="traditions"
        childArray={holiday.tradition_set}
        baseURL={router.asPath + "traditions/"}
      />
      <APIForm
        payload={tradition}
        changeHandler={setTradition}
        url="/api/seasons/traditions"
        method="POST"
      />
      <ChildList
        category="moves"
        childArray={holiday.move_set}
        baseURL={router.asPath + "moves/"}
      />
      <APIForm
        payload={move}
        changeHandler={setMove}
        url="/api/seasons/holiday-moves"
        method="POST"
      />
      <ChildList
        category="customs"
        childArray={holiday.custom_set}
        baseURL={router.asPath + "customs/"}
      />
      <APIForm
        payload={custom}
        changeHandler={setCustom}
        url="/api/seasons/customs"
        method="POST"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `holidays/${context.params.holidayID}/`;
  const response = await fetch(url);
  const holiday = await response.json();
  return { props: { holiday: JSON.stringify(holiday) } };
};

export default Holiday;
