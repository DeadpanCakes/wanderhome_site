import React, { useState } from "react";
import { useRouter } from "next/router";
import ChildList from "../../../../../../../components/ChildList";
import APIForm from "../../../../../../../components/forms/APIForm";

const Effect = (props) => {
  const effect = JSON.parse(props.effect);
  const [move, setMove] = useState({ text: "", effect: effect.id });
  const router = useRouter();
  return (
    <>
      <h1>{effect.text}</h1>
      <ChildList
        childArray={effect.effect_move_set}
        baseURL={router.asPath}
        category="moves"
      />
      <APIForm
        payload={move}
        changeHandler={setMove}
        url="/api/seasons/effect-moves/"
        method="POST"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `effects/${context.params.effectID}/`;
  const response = await fetch(url);
  const effect = await response.json();
  return { props: { effect: JSON.stringify(effect) } };
};

export default Effect;
