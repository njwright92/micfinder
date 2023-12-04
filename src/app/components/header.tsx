"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../../firebase.config"; // Adjust the path as needed
import Link from "next/link";
import AuthModal from "./authModal";
import {
  HomeModernIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run on the client side
      if (!getApps().length) {
        // Initialize Firebase only if it hasn't been initialized
        initializeApp(firebaseConfig);
      }

      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setIsUserSignedIn(!!user);
      });

      return () => unsubscribe(); // Clean up subscription
    }
  }, []);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  return (
    <>
      <header className="bg-blue-900 text-white p-3 mx-auto">
        <nav className="container flex justify-between p-1">
          <Link
            href="/"
            className="neu-button ml-4 text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
          >
            <HomeModernIcon className="inline-block h-4 w-4" />
            <span className="sr-only md:not-sr-only">MicFinder</span>
          </Link>

          <div className="flex gap-2">
            <Link
              href="/about"
              className="neu-button px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <InformationCircleIcon className="inline-block h-4 w-4" />
              <span className="sr-only md:not-sr-only">About</span>
            </Link>
            <Link
              href="/events"
              className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <CalendarDaysIcon className="inline-block h-4 w-4" />
              <span className="sr-only md:not-sr-only">Events</span>
            </Link>
            {!isUserSignedIn && (
              <button
                onClick={toggleAuthModal}
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
              >
                <UserCircleIcon className="inline-block h-4 w-4" />
                <span className="sr-only md:not-sr-only">Sign In/Up</span>
              </button>
            )}
            {isUserSignedIn && (
              <Link
                href="/user"
                className="neu-button text-white px-2 py-1 rounded-lg shadow-md hover:shadow-inner transition duration-300"
              >
                <UserIcon className="inline-block h-4 w-4" />
                <span className="sr-only md:not-sr-only">Profile</span>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </>
  );
}
