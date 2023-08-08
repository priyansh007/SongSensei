import React from "react";
import { Link } from "wouter";
import "./home.css";

function Home() {
  return (
    <><div style={{ backgroundColor: "#d6c099"}} >
      <div className="flex items-center justify-center min-h-screen">
        <div className="my-container container mx-auto py-2">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <div className="p-1 mx-4 flex flex-col" style={{ width: "480px", height: "300px" }}>
                <h1 className="font-bold" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px", color: "#000000", marginBottom: "24px" }}>
                  Find New Music For Your Next Playlist
                </h1>
                <p className="font-bold" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "#0A2A42", marginBottom: "24px" }}>
                  Input any song from Spotify and SongSensei will analyze and recommend new songs just for you
                </p>
                <button className="text-white px-4 py-2 rounded-md" style={{ width: "140px", backgroundColor: "#0069FF" }}>
                  <Link href="/search">Try it out</Link>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 p-4">
              <img
                src="src/images/download.jpg"
                alt="Home Page Image"
                className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fading-text flex items-center justify-center">
      <div className="my-container container mx-auto py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <img
              src="src/images/playlist.png"
              alt="Playlist"
              className="w-full h-auto rounded-lg" />
          </div>
          <div className="md:w-1/2 p-4 ml-8">
            <div className="p-1 mx-4 flex flex-col" style={{ width: "480px", height: "300px" }}>
              <h1 className="font-bold" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px", color: "#000000", marginBottom: "24px" }}>
                Discover Your Perfect Playlist
              </h1>
              <p className="font-bold" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "#0A2A42", marginBottom: "24px" }}>
                Unlock the power of AI to find the best songs and music for every mood and occasion. Whether you're looking for a relaxing playlist or an energetic mix, Song Sensei has got you covered. With recommendations based on your personal taste and preferences, you'll never run out of great music to listen to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ backgroundColor: "#d6c099" }}>
      <div className="fading-text flex items-center justify-center">
        <div className="my-container container mx-auto py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <div className="p-1 mx-4 flex flex-col" style={{ width: "480px", height: "300px" }}>
                <h1 className="font-bold" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px", color: "#000000", marginBottom: "24px" }}>
                  How It Works
                </h1>
                <p className="font-bold" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "#0A2A42", marginBottom: "24px" }}>
                  Song Sensei utilizes cutting-edge technology to curate the perfect music experience for you. Simply connect your Spotify account or upload your own music files, and let our Al analyze your preferences. With Song Sensei, discovering new music has never been easier.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 p-4">
              <img
                src="src/images/technology.png"
                alt="Home Page Image"
                className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
