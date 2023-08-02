import React from "react";
import { Link, useLocation } from "wouter";
import { css } from "@emotion/css";

const styles = {
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px; /* Add margin-bottom to create a gap between header and content */
    background-color: black; /* Set the background color to pure black */
    color: #fff; /* Set the text color to white */
    font-family: "Montserrat", sans-serif; /* Use the "Montserrat" font */
    font-size: 32px; /* Increase font size for the header */
    font-weight: 400; /* Use font weight 400 for a thinner and more professional look */
  `,
  pageTitle: css`
    flex: 1; /* Grow to fill remaining space */
    margin-right: 10px; /* Adjust the margin to create a gap */
    font-family: "Montserrat", sans-serif; /* Use the "Montserrat" font */
    font-size: 28px; /* Increase font size for the page title */
    font-weight: 400; /* Use font weight 400 for a thinner and more professional look */
  `,
  navbar: css`
    font-family: "Montserrat", sans-serif; /* Use the "Montserrat" font */
    font-size: 24px; /* Increase font size for the navbar */
    color: white;
    font-weight: 400; /* Use font weight 400 for a thinner and more professional look */
    & > a {
      margin-right: 30px; /* Increase the margin to space out the links more */
      color: #fff;
      text-decoration: none;
      background-color: transparent; /* Set a transparent background color */
      padding: 8px 16px;
      border-radius: 4px;
      &:hover {
        color: white;
        background-color: #0070f3;
      }
    }
  `,
  activeLink: css`
    background-color: #0070f3;
    color: white;
  `,
};

function Navbar() {
  const [location] = useLocation();

  const isActive = (href) => {
    return href === location ? styles.activeLink : "";
  };

  return (
    <header className={styles.header}>
      <div className={styles.pageTitle}>Song Sensei</div>
      <nav className={styles.navbar}>
        <Link href="/" className={`${styles.navLink} ${isActive("/")}`}>
          Home
        </Link>
        <Link href="/about" className={`${styles.navLink} ${isActive("/about")}`}>
          About
        </Link>
        <Link href="/team" className={`${styles.navLink} ${isActive("/team")}`}>
          Team
        </Link>
        <Link href="/search" className={`${styles.navLink} ${isActive("/search")}`}>
          Search
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
