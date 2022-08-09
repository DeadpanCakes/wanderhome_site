import React from "react";
import Place from "../components/Place";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const altiel = {
  id: "ece2115a-34dd-47ae-95cd-9450cd48563a",
  name: "Altiel",
  residents: ["Foxes", "Owls", "Foxes"],
  gods: ["Boulder"],
  traits: [
    {
      id: 19,
      name: "Lake",
      description:
        "A lake is a vast body of water that spans an overwhelming distance.",
      moves: [
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/43/",
          text: "Describe the beauty of the water.",
          id: 43,
          nature: 19,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/44/",
          text: "Wash something strange up on shore.",
          id: 44,
          nature: 19,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/46/",
          text: "Bring someone somewhere completely unexpected, and give them a token.",
          id: 46,
          nature: 19,
        },
      ],
      aesthetics: [
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/633/",
          text: "Huge Churning Waves",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 633,
          nature: 19,
        },
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/638/",
          text: "A Nearby Vessel You Weren’t Expecting To See",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 638,
          nature: 19,
        },
      ],
      lore: {
        url: "https://wanderhome.herokuapp.com/lore/640/",
        text: "The Kraken From The Deep",
        is_magical: false,
        is_traumatized: false,
        non_magic_text: "",
        non_traumatized_text: "",
        non_traumatized_or_magic_text: "",
        id: 640,
        nature: 19,
      },
    },
    {
      id: 24,
      name: "Castle",
      description:
        "A castle is a place designed to keep everything else far outside its walls.",
      moves: [
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/59/",
          text: "Describe the walls that surround us.",
          id: 59,
          nature: 24,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/60/",
          text: "Spread worry about a distant threat.",
          id: 60,
          nature: 24,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/61/",
          text: "Keep someone from entering, and give them a token.",
          id: 61,
          nature: 24,
        },
      ],
      aesthetics: [
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/692/",
          text: "Trophies From Long-Forgotten Wars",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 692,
          nature: 24,
        },
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/696/",
          text: "The Crest Of A Distant Monarch",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 696,
          nature: 24,
        },
      ],
      lore: {
        url: "https://wanderhome.herokuapp.com/lore/700/",
        text: "The Ghost On The Parapets",
        is_magical: false,
        is_traumatized: false,
        non_magic_text: "",
        non_traumatized_text: "",
        non_traumatized_or_magic_text: "",
        id: 700,
        nature: 24,
      },
    },
    {
      id: 26,
      name: "Metropolis",
      description:
        "A metropolis is a place where a lot of people live and where many communities sit side-by-side.",
      moves: [
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/65/",
          text: "Describe the diversity and variety of people.",
          id: 65,
          nature: 26,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/66/",
          text: "Show conflict between differing needs and worldviews.",
          id: 66,
          nature: 26,
        },
        {
          url: "https://wanderhome.herokuapp.com/nature-moves/67/",
          text: "Tell someone they’re lost, and give them a token.",
          id: 67,
          nature: 26,
        },
      ],
      aesthetics: [
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/714/",
          text: "Tall Ramshackle Apartments",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 714,
          nature: 26,
        },
        {
          url: "https://wanderhome.herokuapp.com/aesthetics/718/",
          text: "More People Than You’ve Ever Met Before",
          is_magical: false,
          is_traumatized: false,
          non_magic_text: "",
          non_traumatized_text: "",
          non_traumatized_or_magic_text: "",
          id: 718,
          nature: 26,
        },
      ],
      lore: {
        url: "https://wanderhome.herokuapp.com/lore/721/",
        text: "The Truce Of The Three Gods",
        is_magical: false,
        is_traumatized: false,
        non_magic_text: "",
        non_traumatized_text: "",
        non_traumatized_or_magic_text: "",
        id: 721,
        nature: 26,
      },
    },
  ],
};

it("renders month signs and lacks", async () => {
  const months = await fetch("https://wanderhome.herokuapp.com/months/").then(
    (res) => res.json()
  );
  const tillsoil = months[0];
  const user = userEvent.setup();
  render(<Place month={tillsoil} place={altiel} />);
  tillsoil.sign_set.forEach((sign) => {
    return expect(
      screen.getByText(sign.text, { exact: false })
    ).toBeInTheDocument();
  });
  tillsoil.lack_set.forEach((sign) => {
    return expect(
      screen.getByText(sign.text, { exact: false })
    ).toBeInTheDocument();
  });
});
