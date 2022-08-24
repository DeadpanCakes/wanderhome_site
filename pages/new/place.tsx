import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import PlaceForm from "../../components/forms/PlaceForm";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import GameContext from "../../components/context/GameContext";

const place = (props) => {
  const { places, setPlaces, fetchPlaces } = useContext(GameContext);
  const natureCategories = JSON.parse(props.natureCategories);
  useEffect(() => {
    if (!places) {
      fetchPlaces();
    }
  }, []);
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
    <DefaultLayout>
      <main>
        <h1>Create A New Place</h1>
        <PlaceForm
          natureCategories={natureCategories}
          submitHandler={submitHandler}
        />
      </main>
    </DefaultLayout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.API + "nature-categories/");
  const natureCategories = await res.json();
  return { props: { natureCategories: JSON.stringify(natureCategories) } };
};

export default place;
