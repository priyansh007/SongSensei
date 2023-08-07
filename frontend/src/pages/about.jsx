function About() {
    return (
        <>
            <div className="flex flex-col items-center justify-center" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
                <div className="text-center max-w-3xl">
                    <h1 className="font-bold mb-4" style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "48px", color: "#000000" }}>
                        Find New Music That Fits Your Taste
                    </h1>
                    <h2 className="font-bold mt-4" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "#0A2A42" }}>
                        SongSensei is a student-developed program meant to help others find new music similar to songs they already love
                    </h2>
                </div>
            </div>
            <div className="container mx-auto py-1" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "64px"}}>
                    <div className="p-1 mx-4 flex flex-col" style={{ width: "340px", height: "300px" }}>
                        <h1 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "24px", color: "#000000" }}>
                            How do I give songs for SongSensei to analyze?
                        </h1>
                        <h2 className="text-xl font-bold text-gray-700" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#0A2A42" }}>
                            Simply click input song and pick any song on Spotify for SongSensei to analyze.
                        </h2>
                    </div>
                    <div className="p-1 mx-4 flex flex-col" style={{ width: "340px", height: "300px" }}>
                        <h1 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "24px", color: "#000000" }}>
                            How does SongSensei work?
                        </h1>
                        <h2 className="text-xl font-bold text-gray-700" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#0A2A42" }}>
                            SongSensei uses the Cyanite API to help analyze any song the user inputs and finds songs that have similar BPM, lyrics, mood, etc.
                        </h2>
                    </div>
                    <div className="p-1 mx-4 flex flex-col" style={{ width: "340px", height: "300px" }}>
                        <h1 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "24px", color: "#000000" }}>
                            Why use SongSensei?
                        </h1>
                        <h2 className="text-xl font-bold text-gray-700" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "18px", color: "#0A2A42" }}>
                            Traditional music platforms such as Spotify mainly only account for similar artists or genres when recommending new music. SongSensei looks through every aspect of a song to find the perfect match for you.
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
