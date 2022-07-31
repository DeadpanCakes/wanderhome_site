import ChildList from "../../../components/ChildList";

const Seasons = (props) => {
  const seasons = JSON.parse(props.seasons);
  return (
    <ChildList category="Seasons" childArray={seasons} baseURL="/cms/seasons" />
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + "seasons/";
  const response = await fetch(url);
  const seasons = JSON.stringify(await response.json());
  return { props: { seasons } };
};

export default Seasons;
