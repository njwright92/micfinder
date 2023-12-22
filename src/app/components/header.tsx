"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./authModal";
import { auth } from "../../../firebase.config";
import {
  CalendarDaysIcon,
  InformationCircleIcon,
  UserCircleIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SearchBar from "./searchBar";
import { useCity } from "./cityContext";
import { useRouter } from "next/navigation";
import micFinder from "src/app/micFinder.webp";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cityContext = useCity();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    // Check if the normalized search term matches a city in CityContext
    const matchingCity = Object.keys(cityContext).find((city) => {
      const normalizedCity = city.toLowerCase();
      return (
        normalizedCity.startsWith(normalizedSearchTerm) ||
        normalizedCity.includes(normalizedSearchTerm)
      );
    });

    if (matchingCity) {
      // Redirect to the events page with the selected city
      router.push(`/events?city=${encodeURIComponent(matchingCity)}`);
    } else {
      // Handle no matches found
      alert("No matching cities found, adding more cities check back soon.");
    }
  };

  return (
    <>
      <header className="bg-red-900 text-white p-2 sticky top-0 z-50">
        <nav className="container flex justify-between items-center">
          <Link
            href="/"
            className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300 flex items-center"
          >
            <Image
              src={micFinder}
              alt="MicFinder Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="hidden md:inline-block">MicFinder</span>
          </Link>

          <SearchBar onSearch={handleSearch} />

          <div className="flex ml-auto">
            <button onClick={toggleMenu}>
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>

          <div
            className={`absolute top-0 right-0 h-screen w-1/4 bg-black bg-opacity-75 z-50 transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out flex flex-col gap-2 p-2`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Link
              href="/events"
              className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300 flex items-center justify-center"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              <span>Events</span>
            </Link>

            {!isUserSignedIn && (
              <button
                onClick={toggleAuthModal}
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300 flex items-center justify-center"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Sign In/Up</span>
              </button>
            )}

            {isUserSignedIn && (
              <Link
                href="/user"
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300 flex items-center justify-center"
              >
                <UserIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            )}

            <Link
              href="/about"
              className="neu-button px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300 flex items-center justify-center"
            >
              <InformationCircleIcon className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </>
  );
}
