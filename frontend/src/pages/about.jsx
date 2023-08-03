function About() {
    return (
        <><div className="flex flex-col items-center justify-center mt-40">
            <div className="text-center max-w-3xl">
                <h1 className="text-7xl font-bold text-black mb-8">
                    Find New Music That Fits Your Taste
                </h1>
                <h2 className="text-3xl font-bold text-gray-700 mt-32">
                    SongSensei is a student-developed program meant to help others find new music similar to songs they already love
                </h2>
            </div>
        </div>
        <div class="container mx-auto py-8 mt-40">
            <div class="grid grid-cols-3 gap-4 justify-center">
                <div class="bg-gray-200 p-4 h-64">
                    <h1 className="text-2xl font-bold text-black mb-8">
                        How do I give songs for SongSensei to analyze?
                    </h1>
                    <h2 className="text-xl font-bold text-gray-700">
                        Simply click input song and pick any song on Spotify for SongSensei to analyze.
                    </h2>
                </div>
                <div class="bg-gray-200 p-4 h-64">
                    <h1 className="text-2xl font-bold text-black mb-8">
                        How does SongSensei work?
                    </h1>
                    <h2 className="text-xl font-bold text-gray-700">
                        SongSensei uses the Cyanite API to help analyze any song the user inputs and finds songs that have similar BPM, lyrics, mood, ect.
                    </h2>
                </div>
                <div class="bg-gray-200 p-4 h-64">
                    <h1 className="text-2xl font-bold text-black mb-8">
                        Why use SongSensei?
                    </h1>
                    <h2 className="text-xl font-bold text-gray-700">
                        Traditional music platforms such as Spotify mainly only account for similar artists or genres when recommending new music. SongSensei looks through every aspect of a song to find the perfect match for you. 
                    </h2>
                </div>
            </div>
        </div></>
    );
}
export default About;