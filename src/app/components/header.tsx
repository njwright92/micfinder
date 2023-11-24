import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-2">
      <nav className="container mx-auto flex justify-between items-center py-2">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-black transition duration-300"
        >
          OpenMicFinder
        </Link>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="neu-button text-white px-4 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
          >
            About
          </Link>
          <Link
            href="/events"
            className="neu-button text-white px-4 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
          >
            Events
          </Link>
        </div>
      </nav>
    </header>
  );
}
