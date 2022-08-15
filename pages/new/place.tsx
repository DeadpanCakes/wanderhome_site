import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PlaceForm from "../../components/forms/PlaceForm";
import useStorage from "../../hooks/useStorage";
import Header from "../../components/header/Header";

const place = (props) => {
  const [places, setPlaces, fetchPlaces] = useStorage("places", null);
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
    <>
      <Header />
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
