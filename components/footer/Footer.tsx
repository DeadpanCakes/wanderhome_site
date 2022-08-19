import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.linkList}>
        <li>
          <Link href="https://github.com/DeadpanCakes/wanderhome_site">
            <a className={styles.links}>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
