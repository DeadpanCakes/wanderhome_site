import React from "react";
import Link from "next/link";
import styles from "../../styles/header/About.module.css";

const Info = () => {
  return (
    <div className={styles.about}>
      <h1>What This Is</h1>
      <p>
        This is a simple web app I'm making to aid in the play of Wanderhome, a
        tabletop roleplaying game (TTRPG) by Jay Dragon. It is a No Dice, No
        Masters/Belonging Outside Belonging game, a fairly recent design ethos
        for TTRPG's, and thus I've struggled to find many play aids tuned
        specifically for online play. As my group is fully online, I figured I'd
        make my own tool for us to use.
      </p>
      <br />
      <p>
        This tool is not designed to just let anyone play the game. Rather, I
        wanted an easy way to access all the moves during play. No Dice, No
        Masters and especially Belonging Outside Belonging games are much more
        than the sum of their mechanics, and I can't imagine how one would would
        wrap their heads around this API without reading through the PDF first.
        So, if you don't have Wanderhome yet, you can find it at Possum Creek
        Games'{" "}
        <Link href="https://possumcreekgames.com/products/wanderhome-pdf">
          <a>website</a>
        </Link>
        . If you're struggling financially, free community copies occasionally
        show up on their{" "}
        <Link href="https://possumcreekgames.itch.io/wanderhome">
          <a>itch page</a>
        </Link>
        .
      </p>
      <br />
      <p>
        I'm not associated with anyone who worked on this game, this is just a
        hobby.
      </p>
    </div>
  );
};

export default Info;
