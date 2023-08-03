import React from "react";
import { Link, useLocation } from "wouter";
import { css, keyframes } from "@emotion/css";

const styles = {
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px; /* Add margin-bottom to create a gap between header and content */
    background: linear-gradient(135deg, #0070f3, #00b4d8); /* Gradient background color */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a box shadow for depth */
    color: #fff; /* Set the text color to white */
    font-family: Arial, sans-serif; /* Use a fallback font stack */
    font-size: 32px; /* Increase font size for the header */
    font-weight: 600; /* Use font weight 600 for a bold look */
  `,
  pageTitle: css`
    flex: 1; /* Grow to fill remaining space */
    margin-right: 10px; /* Adjust the margin to create a gap */
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; /* Use a modern sans-serif font */
    font-size: 40px; /* Increase font size for the page title */
    font-weight: 700; /* Use font weight 700 for a bolder look */
  `,
  navbar: css`
    font-family: Arial, sans-serif; /* Use a fallback font stack */
    font-size: 20px; /* Decrease font size for the navbar */
    color: white;
    font-weight: 600; /* Use font weight 600 for a bold look */
    & > a {
      margin-right: 30px; /* Increase the margin to space out the links more */
      color: #fff;
      text-decoration: none;
      background-color: transparent; /* Set a transparent background color */
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.3s ease; /* Add a smooth transition on hover */
      &:hover {
        color: white;
        background-color: #003049; /* Darker color when hovered */
      }
    }
    & .activeLink {
      /* Styles for the active link */
      background-color: #003049; /* Darker color for active link */
    }
  `,
};

function Navbar() {
  const [location] = useLocation();

  const isActive = (href) => {
    return href === location ? "activeLink" : "";
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
