import { useState } from "react";
import { useRouter } from "next/router";
import ChildList from "../../../../../../../components/ChildList";
import APIForm from "../../../../../../../components/forms/APIForm";

const event = (props) => {
  const event = JSON.parse(props.event);
  const router = useRouter();
  const [effect, setEffect] = useState({
    text: "",
    event: event.id,
  });
  console.log(event);
  return (
    <>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.trigger}</p>
      <ChildList
        childArray={event.effect_set}
        category="effects"
        baseURL={router.asPath}
      />
      <APIForm
        payload={effect}
        changeHandler={setEffect}
        url="/api/seasons/effects"
        method="POST"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `months/${context.params.monthID}/`;
  const response = await fetch(url);
  const month = await response.json();
  const event = JSON.stringify(month.event);
  return { props: { event } };
};

export default event;
