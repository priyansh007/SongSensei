import homepic from "../images/home_image.png";
import { Link } from "wouter";

function Home() {
  return (
    <div className="flex justify-center mt-20">
      <div className="flex-1 m-20 flex flex-col justify-center">
        <h1 className="text-7xl font-bold text-black">
          Find New Music For Your Next Playlist
        </h1>
        <h2 className="text-3xl text-gray-700 mt-10">
          Input any song from your files or through Spotify and SongSensei will analyze and recommend new songs just for you
        </h2>
        <div className="mt-6 flex">
          <Link href="/search">
            <button style={{ backgroundColor: "rgb(0, 148, 255)" }} className="py-3 px-6 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
              Try it out!
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 m-20">
        <img
          src={homepic}
          alt="Image"
          className="max-h-1/2 max-w-1/2"
        />
      </div>
    </div>
  );
}

export default Home;