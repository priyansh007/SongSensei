import React from "react";
import { Link, useLocation } from "wouter";
import { css, keyframes } from "@emotion/css";
import logo from "../images/songsenseilogoimage.png";

const styles = {
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #555555; /* Charcoal background color */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a box shadow for depth */
    color: #fff; /* Set the text color to white */
    font-family: Arial, sans-serif; /* Use a fallback font stack */
    font-size: 32px; /* Increase font size for the header */
    font-weight: 600; /* Use font weight 600 for a bold look */
    margin: 0; /* Remove margin */
    padding: 10px; /* Add 10px padding on all sides */
  `,
  pageTitle: css`
    display: flex;
    align-items: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 40px;
    font-weight: 700;
    & > img {
      width: auto; // This will maintain the aspect ratio of the image
      height: 40px; // Set the maximum height of the image to 40px (same as the "Song Sensei" text)
      margin-right: 10px;
    }
  `,
  navbar: css`
    font-family: Arial, sans-serif; /* Use a fallback font stack */
    font-size: 20px; /* Decrease font size for the navbar */
    color: white;
    font-weight: 600; /* Use font weight 600 for a bold look */
    padding: 10px; /* Add 10px padding on all sides */
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
        background-color: #333333; /* Darker color when hovered */
      }
    }
    & .activeLink {
      /* Styles for the active link */
      background-color: #333333; /* Darker color for active link */
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
      <div className={styles.pageTitle}>
        <img src={logo} alt="Logo" />
        Song Sensei
      </div>
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
        <Link href="/input" className={`${styles.navLink} ${isActive("/input")}`}>
          File Input
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
