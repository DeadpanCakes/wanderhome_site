import React from "react";
import { v4 as uuid } from "uuid";
import styles from "../../styles/Tools.module.css";

const Tools = () => {
  const tools = [
    {
      name: "Let's do this instead",
      desc: "Sometimes on a journey you’ll reach an impasse, where continuing down a particular path will put you in danger or discomfort. You are always empowered to speak up, say “Let’s do this instead!” and provide an alternate path through the situation. Ifsomeone else doesn’t want to do that, we can work together to figure out where to go next.",
      ex: [
        "“Let’s take the safer path instead.”",
        "“Let’s not talk about this right now, and change the topic.”",
        "“Let’s not have my character lose this thing I care about. Instead, I’m going to let go of something I don’t mind losing.”",
      ],
    },
    {
      name: "Do we want to...?",
      desc: "When you’re journeying, it’s polite to ask before traveling into uncharted territory. If someone asks “Do we want to?” it means they’re interested in going somewhere new and potentially hazardous, and they want everyone’s buy-in first. If you don’t want to go there with them, you have every right to say so (perhaps by offering something else instead) and the conversation can avoid that area.",
      ex: [
        "“Do we want to talk about what just happened?”",
        "“Do we want to grapple with themes of health in our journey?”",
        "“Do we want to have trauma in my character’s backstory?”",
      ],
    },
    {
      name: "Where to next?",
      desc: "When we journey together, we might get lost or stuck. This happens all the time, and we might feel like we have nowhere to go from here, or that we have to keep sitting in the mud. Whenever we feel like that’s happening, we can just ask “Where to next?” and go where seems best.",
      ex: [
        "“We’re at a fork in the road. Where to next?”",
        "“I think this is a good spot to cut away from this scene. Where to next?”",
        "“So it feels like we’re stuck in a rut, and we should talk about what kind of journey we want this to be. Where to next?”",
      ],
    },
    {
      name: "What do you think?",
      desc: "When I walk with friends, I tend to move a bit slower and need a bit more time than they do. In those moments, just as with all journeys, we often need people to look around and spot those who could use a bit of focus and more space to express themselves and breathe. Keep an eye out for people who seem to be talking less than you are, and check in with them by asking them “What do you think?”",
      ex: [
        "“There’s a couple different paths we could take. What do you think we should do?”",
        "“I was considering this nature for our place, but I feel like I’ve been talking a lot. What do you think it should be?”",
        "“I’ve been the focus too much lately. What do you think about a moment with your character and the shopkeep?”",
      ],
    },
    {
      name: "Hold on.",
      desc: "We all need to take breaks. Sometimes it’s because we’ve been journeying for a while and we need some water, or it’s because we want to go back and look at something from earlier, or maybe something happened that hurt us and we need to tackle it. “Hold on” is something we can always say to halt what’s happening and switch gears to another topic.",
      ex: [
        "“Hold on. Before we travel to the village, I need to use the bathroom.”",
        "“Hold on. I want to cut back to the scene with the fisher, I still have more I want to say.”",
        "“Hold on. What happened earlier made me feel minimized and spoken over, and we should talk about it.”",
      ],
    },
    {
      name: "No.",
      desc: "No one can ever make you do something you don’t want to do. If some aspect of the journey doesn’t fit your needs, you can always change it. While it’s important to respect where everyone is at, it’s just as important that you feel like you have agency over your character and the world around you. You have the complete authority, both as a group and as individuals, to reject anything that we don’t want.",
      ex: [
        "“No, I don’t want to go to the swamp.”",
        "“No, I don’t want someone to treat my character like this.”",
        "“No, this passage from the book doesn’t seem right for the journey we’re on. Let’s change it.”",
      ],
    },
    {
      name: "Walking away.",
      desc: "All of these journeying tools assume that the game is healthy and productive for you. There is the base assumption that a conversation is the core way of navigating these issues, and that talking things through will handle most problems. This isn’t always true, though. If you ever feel like you don’t want to keep going on right now, you can leave.",
      ex: [],
    },
    {
      name: "Other tools",
      desc: "There are plenty of other tools we can use on our journey, including the X-Card, Script Change, Lines and Veils, and the Safety Checklist (among others.) Some of them overlap with the tools included in Wanderhome, while others give additional guidance to helping everyone feel safe. We can use whatever tools feel right for us.",
      ex: [],
    },
  ];
  return (
    <div className={styles.tools}>
      <h2>Tools</h2>
      <ul className={styles.toolList}>
        {tools.map((tool) => {
          return (
            <li key={uuid()}>
              <h2>{tool.name}</h2>
              <p>{tool.desc}</p>
              <ul>
                {tool.ex.map((ex) => (
                  <li key={uuid}>{ex}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tools;
