import React, { useEffect, useState } from "react";
import styles from "./navbar.scss";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarHeight = 50;
  const smallLogoHeight = 40;
  const bigLogoHeight = 120;

  const smallSpeed = smallLogoHeight / bigLogoHeight;
  const ySmall = scrollY * smallSpeed;

  let smallPadding = navbarHeight - ySmall;
  smallPadding = Math.max(0, Math.min(smallPadding, navbarHeight));

  const navOpacity = Math.min(1, Math.max(0, ySmall / smallLogoHeight));
  const navbarBackgroundColor = `rgba(62, 195, 246, ${navOpacity})`;
  const shadowOpacity = navOpacity * 0.4;
  const boxShadow =
    scrollY > 1 ? `0 2px 3px rgba(0,0,0,${shadowOpacity})` : "none";

  return (
    <>
      <nav className={styles.navbar} style={{ backgroundColor: navbarBackgroundColor, boxShadow }}>
        <div className={styles.container}>
          <div className={styles.navbarHeader}>
            <button className={styles.navbarToggle}>☰</button>
            <div
              className={styles.smallLogoContainer}
              style={{ paddingTop: smallPadding }}
            >
              <a className={styles.smallLogo} href="#">↥Small Logo</a>
            </div>
          </div>
          <ul className={styles.navbarNav}>
            <li className={styles.active}><a href="#">Active</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
          </ul>
        </div>
      </nav>

      <div className={styles.bigLogoRow}>
        <h1 className={styles.bigLogo}>↧Big Logo</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Lorem Ipsum</h2>
          <p>Dolor sit amet, consectetur adipisicing elit...</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;