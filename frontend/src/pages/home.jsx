import React from "react";
<<<<<<< HEAD
import { Link } from "wouter"; // Import the Link component
=======
import { Link } from 'wouter';
>>>>>>> c1084c4bde6c3f7dd9fd216b1e6ca6c67deaae98

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="my-container container mx-auto py-2">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 p-4">
            <h1 className="text-4xl font-bold mb-4">
              Find New Music For Your Next Playlist
            </h1>
            <p className="text-gray-700 mb-4">
              Input any song from Spotify and SongSensei will analyze and recommend new songs just for you
            </p>
            {/* Button */}
<<<<<<< HEAD
            <Link to="/about"> {/* Use the Link component with the path of the About page */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Learn More
              </button>
            </Link>
=======
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <Link href="/search">Try it out</Link>
            </button>
>>>>>>> c1084c4bde6c3f7dd9fd216b1e6ca6c67deaae98
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