import ChildList from "../../../../components/ChildList";
import { v4 as uuid } from "uuid";

const Playbook = (props) => {
  const playbook = JSON.parse(props.playbook);
  const baseURL = `/cms/playbooks/${playbook.name}`;
  return (
    <>
      <h1>{playbook.name}</h1>
      <p>{playbook.description}</p>
      <ChildList
        category="Animal"
        baseURL={baseURL + "/animal"}
        childArray={playbook.animal_set}
      />
      <p>{playbook.personality.prompt}</p>
      <ChildList
        category="personality"
        baseURL={baseURL + "/personality"}
        childArray={playbook.personality.option_set}
      />
      <ChildList
        category="Appearance"
        baseURL={baseURL + "/appearance"}
        childArray={playbook.appearance_set}
      />
      {playbook.history_set.map((history) => {
        return (
          <>
            <h2>{history.prompt}</h2>
            <ChildList
              category={uuid()}
              baseURL={baseURL + "/history"}
              childArray={history.option_set}
            />
          </>
        );
      })}
      <ChildList
        category="relationships"
        baseURL={baseURL + "/relationships"}
        childArray={playbook.relationship_set}
      />
      <ChildList
        category="signature moves"
        baseURL={baseURL + "/signature"}
        childArray={playbook.signature_move_set}
      />
      <ChildList
        category="seasonal moves"
        baseURL={baseURL + "/seasonal"}
        childArray={playbook.seasonal_move_set}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { playbookID: targetID } = context.params;
  const url = process.env.API + `playbooks/${targetID}/`;
  const response = await fetch(url);
  const data = await response.json();
  const playbook = JSON.stringify(data);
  return { props: { playbook } };
};

export default Playbook;
