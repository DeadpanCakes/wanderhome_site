import ChildList from "../../../components/ChildList";
import PlaybookForm from "../../../components/forms/playbooks/PlaybookForm";

const Playbooks = (props) => {
  const playbooks = JSON.parse(props.playbooks);
  return (
    <>
      <ChildList
        category="Playbooks"
        childArray={playbooks}
        baseURL="/cms/playbooks"
      />
      <PlaybookForm />
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(process.env.API + "playbooks/");
  const data = await response.json();
  const playbooks = JSON.stringify(data);
  return { props: { playbooks } };
};

export default Playbooks;
