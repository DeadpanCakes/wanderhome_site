import { useState } from "react";
import ChildList from "../../../../components/ChildList";
import APIForm from "../../../../components/forms/APIForm";

const personality = (props) => {
  const playbook = JSON.parse(props.playbook);
  const [option, setOption] = useState({
    text: "",
    personality: playbook.personality.id,
  });
  return (
    <>
      <h1>Personality</h1>
      <ChildList
        category="options"
        baseURL={`/cms/playbooks/${playbook.id}/personality`}
        childArray={playbook.personality.option_set}
      />
      <APIForm
        payload={option}
        method="POST"
        url="/api/playbooks/personality-options/"
        changeHandler={setOption}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { playbookID } = context.params;
  const url = process.env.API + `playbooks/${playbookID}/`;
  const response = await fetch(url);
  const playbook = await response.json();
  return { props: { playbook: JSON.stringify(playbook) } };
};
export default personality;
