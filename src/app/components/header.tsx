import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold">
          OpenMicFinder
        </Link>
        <div>
          <Link href="/about" className="mx-2">
            About
          </Link>
          <Link href="/events" className="mx-2">
            Events
          </Link>
        </div>
      </nav>
    </header>
  );
}
