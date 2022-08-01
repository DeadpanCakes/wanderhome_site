import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ChildList from "../../../../../../components/ChildList";
import APIForm from "../../../../../../components/forms/APIForm";

const Month = (props) => {
  const month = JSON.parse(props.month);
  const router = useRouter();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    trigger: "",
    month: month.id,
  });
  const [lack, setLack] = useState({
    text: "",
    month: month.id,
  });
  const [sign, setSign] = useState({
    text: "",
    month: month.id,
  });
  return (
    <>
      <h1>{month.name}</h1>
      <p>{month.description}</p>
      <h2>Event</h2>
      {month.event ? (
        <>
          <Link href={router.asPath + "/event"}>
            <a>
              <h3>{month.event.name}</h3>
              <p>{month.event.description}</p>
            </a>
          </Link>
          <ChildList
            category="Effects"
            childArray={month.event.effect_set}
            baseURL={router.asPath + "/event"}
          />
        </>
      ) : (
        <APIForm
          payload={event}
          changeHandler={setEvent}
          url="/api/seasons/events"
          method="POST"
        />
      )}
      <ChildList
        childArray={month.lack_set}
        baseURL={router.asPath}
        category="Lacks"
      />
      <APIForm
        payload={lack}
        changeHandler={setLack}
        url="/ai/seasons/lacks"
        method="POST"
      />
      <ChildList
        childArray={month.sign_set}
        baseURL={router.asPath}
        category="Signs"
      />
      <APIForm
        payload={sign}
        changeHandler={setSign}
        url="/api/seasons/signs"
        method="POST"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `months/${context.params.monthID}/`;
  const response = await fetch(url);
  const month = await response.json();
  return { props: { month: JSON.stringify(month) } };
};

export default Month;
