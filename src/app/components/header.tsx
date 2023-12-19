"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import AuthModal from "./authModal";
import { auth } from "../../../firebase.config";
import {
  HomeModernIcon,
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
      <header className="bg-red-900 text-white p-3 mx-auto sticky top-0">
        <nav className="container flex justify-between items-center p-1">
          <Link
            href="/"
            className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
          >
            <HomeModernIcon className="h-7 w-7" />
            <span className="hidden md:inline-block">MicFinder</span>
          </Link>
          <SearchBar onSearch={handleSearch} />
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`flex gap-2 ${isMenuOpen ? "flex" : "hidden"} md:flex`}
          >
            <Link
              href="/events"
              className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              <span className="hidden md:inline">Events</span>
            </Link>

            {!isUserSignedIn && (
              <button
                onClick={toggleAuthModal}
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="hidden md:inline">Sign In/Up</span>
              </button>
            )}

            {isUserSignedIn && (
              <Link
                href="/user"
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
              >
                <UserIcon className="h-5 w-5" />
                <span className="hidden md:inline">Profile</span>
              </Link>
            )}

            <Link
              href="/about"
              className="neu-button px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <InformationCircleIcon className="h-5 w-5" />
              <span className="hidden md:inline">About</span>
            </Link>
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </>
  );
}
