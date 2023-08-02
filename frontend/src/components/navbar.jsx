import { Link } from "wouter";

function Navbar() {
    return (
        <nav className="container mx-auto max-w-3xl text-blue-600 mt-10 px-5">
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
        </nav>
    );
}
export default Navbar;