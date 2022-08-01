import { useState } from "react";
import ChildList from "../../../../../components/ChildList";
import APIForm from "../../../../../components/forms/APIForm";
import BooleanField from "../../../../../components/BooleanField";
import { text } from "stream/consumers";

const History = (props) => {
  const playbook = JSON.parse(props.playbook);
  const history = JSON.parse(props.history);
  const [option, setOption] = useState({
    text: "",
    non_magic_text: "",
    non_traumatized_text: "",
    non_traumatized_or_magic_text: "",
    is_magic: false,
    is_traumatized: false,
    history: history.id,
  });
  return (
    <>
      <h1>History</h1>
      <ChildList
        category="options"
        baseURL={`/cms/playbooks/${playbook.id}/histories/option/`}
        childArray={history.option_set}
      />
      <APIForm
        method="POST"
        url="/api/playbooks/history-options"
        payload={option}
        changeHandler={(x) => {
          setOption(x);
        }}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { playbookID, historyID: targetID } = context.params;
  const url = process.env.API + `playbooks/${playbookID}`;
  const response = await fetch(url);
  const playbook = await response.json();
  const history = playbook.history_set.find(
    (history) => history.id.toString() === targetID
  );
  return {
    props: {
      history: JSON.stringify(history),
      playbook: JSON.stringify(playbook),
    },
  };
};

export default History;
