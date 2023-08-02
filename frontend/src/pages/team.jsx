function Team() {
    return (
        <h1 className="text-center text-xl font-bold text-slate-600 mt-20">
        Team Page
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Meet the team behind SongSensei</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Team Member 1 */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Kai Yuan</h2>
            <p className="text-gray-600">Frontend</p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Joshua Zhang</h2>
            <p className="text-gray-600">Frontend</p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Aaron Hsi</h2>
            <p className="text-gray-600">Frontend</p>
          </div>
          {/* Team Member 4 */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tony Feng</h2>
            <p className="text-gray-600">Backend</p>
          </div>
          {/* Team Member 5 */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Gunnar Erickson</h2>
            <p className="text-gray-600">Backend</p>
          </div>
        </div>
      </div>
    </h1>



    );
}
export default Team;