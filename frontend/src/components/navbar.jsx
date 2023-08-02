import { Link } from "wouter";
import { useState } from "react";

function Navbar() {
    return (
        <nav className="container mx-auto max-w-3xl text-blue-600 mt-10 px-5">
            <div style={{ float: "right", fontFamily: "Arial, sans-serif", fontSize: "18px" }}>
                <Link href="/" className="inline-block mr-5 hover:text-blue-400">
                    Home
                </Link>
                <Link href="/about" className="inline-block mr-5 hover:text-blue-400">
                    About
                </Link>  
                <Link href="/team" className="inline-block mr-5 hover:text-blue-400">
                    Team
                </Link>  
                <Link href="/search" className="inline-block mr-5 hover:text-blue-400">
                    Search
                </Link> 
            </div> 
        </nav>
    );
}
export default Navbar;