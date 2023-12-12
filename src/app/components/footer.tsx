"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import ClientOnlySignOutButton from "./ClientSignOut";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function Footer() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const handleAuthStateChanged = useCallback((user: User | null) => {
    setIsUserSignedIn(!!user);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => unsubscribe();
  }, [handleAuthStateChanged]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-300 text-black mx-auto text-center p-4 border-2 border-gray-400">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between relative">
        <div>
          <h1 className="font-bold text-xl mb-2 mt-4 lg:mt-0">Contact Us</h1>
          <p className=" text-md mb-2">💌 contact@openmicfinder.com</p>
          <a
            href="mailto:nitronate@gmail.com"
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2rounded"
          >
            Email Me
          </a>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-xl mb-2 mt-4 lg:mt-0">
            Check Out Comedify!
          </h1>
          <p className="text-md font-bold mb-2">
            An app to interact with comicBot and write/store your jokes
          </p>
          <a
            href="https://comedify-54274.web.app/"
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4  mt-2 rounded"
          >
            Visit Comedify 😃
          </a>
          <p className="italic mb-2 mt-8">
            © {new Date().getFullYear()} OpenMicFinder
          </p>
        </div>
        {isUserSignedIn && (
          <div className="mt-4 lg:mt-0">
            <ClientOnlySignOutButton />
          </div>
        )}
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 m-2 bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded"
          aria-label="Back to top"
        >
          <ArrowUpCircleIcon className="h-7 w-7" />
        </button>
      </div>
    </footer>
  );
}
