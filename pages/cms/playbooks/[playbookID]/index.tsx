import React, { useState } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import ChildList from "../../../../components/ChildList";
import APIForm from "../../../../components/forms/APIForm";

const Playbook = (props) => {
  const playbook = JSON.parse(props.playbook);
  const baseURL = `/cms/playbooks/${playbook.name}`;
  const [animal, setAnimal] = useState({
    text: "",
    playbook: playbook.id,
  });
  const [personality, setPersonality] = useState({
    prompt: "",
    playbook: playbook.id,
  });
  const [appearance, setAppearance] = useState({
    text: "",
    playbook: playbook.id,
  });
  const [history, setHistory] = useState({
    prompt: "",
    playbook: playbook.id,
  });
  const [relationship, setRelationship] = useState({
    text: "",
    playbook: playbook.id,
  });
  const [signatureMove, setSignatureMove] = useState({
    text: "",
    playbook: playbook.id,
  });
  const [seasonalMove, setSeasonalMove] = useState({
    text: "",
    playbook: playbook.id,
  });
  return (
    <>
      <h1>{playbook.name}</h1>
      <p>{playbook.description}</p>
      <ChildList
        category="Animal"
        baseURL={baseURL + "/animal"}
        childArray={playbook.animal_set}
      />
      <APIForm
        payload={animal}
        method="POST"
        url="/api/playbooks/animals"
        changeHandler={setAnimal}
      />
      <h2>Personality</h2>
      {playbook.personality ? (
        <Link href={`/cms/playbooks/${playbook.id}/personality/`}>
          <p>Prompt: {playbook.personality.prompt}</p>
        </Link>
      ) : null}
      {playbook.personality ? (
        playbook.personality.option_set.length > 0 ? (
          <ChildList
            category="options"
            baseURL={baseURL + "/personality"}
            childArray={playbook.personality.option_set}
          />
        ) : null
      ) : null}
      {playbook.personality ? null : (
        <APIForm
          payload={personality}
          method="POST"
          url="/api/playbooks/personalities"
          changeHandler={setPersonality}
        />
      )}
      <ChildList
        category="Appearance"
        baseURL={baseURL + "/appearance"}
        childArray={playbook.appearance_set}
      />
      <APIForm
        payload={appearance}
        method="POST"
        url="/api/playbooks/appearances"
        changeHandler={setAppearance}
      />
      <h2>History</h2>
      {playbook.history_set.map((history) => {
        return (
          <>
            <Link
              href={`/cms/playbooks/${playbook.id}/histories/${history.id}`}
            >
              <h2>{history.prompt}</h2>
            </Link>
            <ChildList
              category="history"
              baseURL={baseURL + "/history"}
              childArray={history.option_set}
            />
          </>
        );
      })}
      <APIForm
        payload={history}
        method="POST"
        url="/api/playbooks/histories"
        changeHandler={setHistory}
      />
      <ChildList
        category="relationships"
        baseURL={baseURL + "/relationships"}
        childArray={playbook.relationship_set}
      />
      <APIForm
        payload={relationship}
        method="POST"
        url="/api/playbooks/relationships"
        changeHandler={setRelationship}
      />
      <ChildList
        category="signature moves"
        baseURL={baseURL + "/signature"}
        childArray={playbook.signature_move_set}
      />
      <APIForm
        payload={signatureMove}
        method="POST"
        url="/api/playbooks/signature-moves"
        changeHandler={setSignatureMove}
      />
      <ChildList
        category="seasonal moves"
        baseURL={baseURL + "/seasonal"}
        childArray={playbook.seasonal_move_set}
      />
      <APIForm
        payload={seasonalMove}
        method="POST"
        url="/api/playbooks/seasonal-moves"
        changeHandler={setSeasonalMove}
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
