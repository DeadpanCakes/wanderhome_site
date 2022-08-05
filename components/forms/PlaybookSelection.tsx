import React from "react";
import usePlaybookInterfacer from "../../hooks/usePlaybookInterfacer";
import styles from "../../styles/PCForm.module.css";

const PlaybookSelection = ({
  playbooks,
  chosenPlaybook,
  setChosenPlaybook,
}) => (
  <div>
    <ul className={styles.playbookList}>
      {playbooks.map((playbook) => {
        return (
          <li className={styles.playbookListing} key={playbook.id}>
            <input
              type="checkbox"
              id={playbook.id}
              onChange={() => {
                const target = playbook;
                const choice = playbooks.find(
                  (playbook) => playbook.id === target.id
                );
                setChosenPlaybook(usePlaybookInterfacer(choice));
              }}
              checked={playbook.id === chosenPlaybook.id}
            />
            <label htmlFor={playbook.id}>
              <h2>{playbook.name}</h2>
              <p>{playbook.description}</p>
            </label>
          </li>
        );
      })}
    </ul>
  </div>
);

export default PlaybookSelection;
