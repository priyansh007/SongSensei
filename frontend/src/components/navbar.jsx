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
    font-family: Arial, sans-serif;
    font-size: 32px; /* Increase font size for the header */
    font-weight: bold;
  `,
  pageTitle: css`
    flex: 1; /* Grow to fill remaining space */
    margin-right: 10px; /* Adjust the margin to create a gap */
    font-size: 28px; /* Increase font size for the page title */
  `,
  navbar: css`
    font-family: Arial, sans-serif;
    font-size: 24px; /* Increase font size for the navbar */
    color: white;
    & > a {
      margin-right: 10px;
      color: #fff;
      text-decoration: none;
      &:hover {
        color: white;
        background-color: #0070f3;
        padding: 8px 16px;
        border-radius: 4px;
      }
    }
  `,
  activeLink: css`
    background-color: #0070f3;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
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
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
        <Link href="/about" className={isActive("/about")}>
          About
        </Link>
        <Link href="/team" className={isActive("/team")}>
          Team
        </Link>
        <Link href="/search" className={isActive("/search")}>
          Search
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
