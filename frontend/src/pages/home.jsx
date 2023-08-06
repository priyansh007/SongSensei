import React from "react";
import { Link } from "wouter"; // Import the Link component

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#c4ae78" }}>
      <div className="my-container container mx-auto py-2">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 p-4">
            <div className="p-1 mx-4 flex flex-col" style={{ width: "480px", height: "300px" }}>
              <h1 className="font-bold" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px", color: "#000000", marginBottom: "24px" }}>
                Find New Music For Your Next Playlist
              </h1>
              <p className="font-bold" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "#0A2A42", marginBottom: "24px" }}>
                Input any song from Spotify and SongSensei will analyze and recommend new songs just for you
              </p>
              {/* Button */}
              <button className="text-white px-4 py-2 rounded-md" style={{ width: "140px", backgroundColor: "#0069FF" }}>
                <Link href="/search">Try it out</Link>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 p-4">
            <img
              src="src/images/download.jpg" // The image path inside the public folder
              alt="Home Page Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
