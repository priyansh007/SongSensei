import { Link } from "wouter";

function Navbar() {
    return (
        <nav className="container mx-auto max-w-3xl text-blue-600 mt-10 px-5">
            <Link href="/" className="inline-block mr-5 hover:text-blue-400">
                Home
            </Link>
						{/* add "mr-5" class to /about link for spacing */}
            <Link href="/about" className="inline-block mr-5 hover:text-blue-400">
                About
            </Link>
						{/* add summarize page link */}
            <Link href="/summarize" className="inline-block hover:text-blue-400">
                Summarize
            </Link>
        </nav>
    );
}
export default Navbar;