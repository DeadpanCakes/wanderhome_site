import { useRouter } from "next/router";
import PlaceForm from "../../components/forms/PlaceForm";
import useStorage from "../../hooks/useStorage";

const place = (props) => {
  const [places, setPlaces, fetchPlaces] = useStorage("places", null);
  const natureCategories = JSON.parse(props.natureCategories);
  const addNewPlace = (newPlace) => {
    setPlaces((prevState) => {
      if (prevState) {
        return prevState.concat(newPlace);
      }
      return [newPlace];
    });
  };
  const router = useRouter();
  const submitHandler = (newPlace) => {
    addNewPlace(newPlace);
    router.push("/");
  };
  return (
    <>
      <h1>Create A New Place</h1>
      <PlaceForm
        natureCategories={natureCategories}
        submitHandler={submitHandler}
      />
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.API + "nature-categories/");
  const natureCategories = await res.json();
  return { props: { natureCategories: JSON.stringify(natureCategories) } };
};

export default place;
