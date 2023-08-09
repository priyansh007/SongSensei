function Team() {
  return (
    <div className="text-center text-xl font-bold text-slate-600 mt-20">
      <div className="container mx-auto">
        <div style={{ padding: "48px" }}>
          <h1 style={{ fontSize: "24px", fontFamily: "Inter, sans-serif", color: "#0A2A42", marginBottom: "48px", fontWeight: "600" }}>
            THE TEAM BEHIND SONGSENSEI
          </h1>
          <h1 style={{ fontSize: "48px", fontFamily: "Inter, sans-serif", color: "#000000", marginBottom: "48px", fontWeight: "700" }}>
            Front-end Developers
          </h1>
          <p style={{ fontSize: "16px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "400" }}>
            This team helped create the website and all the functions within it
          </p>
        </div>
      </div>
      <div className="container mx-auto py-1" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "64px"}}>
          <div className="bg-white border border-gray-300 shadow-md p-1 rounded-lg mx-4 flex flex-col justify-center items-center" style={{ width: "356px", height: "123px" }}>
            <h2 className="font-semibold" style={{ fontSize: "32px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "700" }}>Joshua Zhang</h2>
            <p className="font-semibold" style={{ marginTop: "10px", color: "#678398", fontWeight: "500" }}>Junior</p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md p-1 rounded-lg mx-4 flex flex-col justify-center items-center" style={{ width: "356px", height: "123px" }}>
            <h2 className="font-semibold" style={{ fontSize: "32px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "700" }}>Kai Yuan</h2>
            <p className="font-semibold" style={{ marginTop: "10px", color: "#678398", fontWeight: "500" }}>Junior</p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md p-1 rounded-lg mx-4 flex flex-col justify-center items-center" style={{ width: "356px", height: "123px" }}>
            <h2 className="font-semibold" style={{ fontSize: "32px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "700" }}>Aaron Hsi</h2>
            <p className="font-semibold" style={{ marginTop: "10px", color: "#678398", fontWeight: "500" }}>Senior</p>
          </div>
        </div>
        <div className="container mx-auto">
          <div style={{ padding: "48px" }}>
            <h1 style={{ fontSize: "48px", fontFamily: "Inter, sans-serif", color: "#000000", marginBottom: "48px", fontWeight: "700" }}>
              Back-end Developers
            </h1>
            <p style={{ fontSize: "16px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "400" }}>
              This team helped integrate the AI models and trained the machine learning AI
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "128px" }}>
          <div className="bg-white border border-gray-300 shadow-md p-4 rounded-lg mx-4 flex flex-col justify-center items-center" style={{ width: "356px", height: "123px" }}>
            <h2 className="font-semibold" style={{ fontSize: "32px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "700" }}>Tony Feng</h2>
            <p className="font-semibold" style={{ marginTop: "10px", color: "#678398", fontWeight: "500" }}>Junior</p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md p-4 rounded-lg mx-4 flex flex-col justify-center items-center" style={{ width: "356px", height: "123px" }}>
            <h2 className="font-semibold" style={{ fontSize: "32px", fontFamily: "Inter, sans-serif", color: "#0A2A42", fontWeight: "700" }}>Gunnar Erickson</h2>
            <p className="font-semibold" style={{ marginTop: "10px", color: "#678398", fontWeight: "500" }}>Junior</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
