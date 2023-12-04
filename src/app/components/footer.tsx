"use client";

import React, { useEffect, useState, useCallback } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
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

  return (
    <footer className="bg-gray-300 text-black mx-auto text-center p-4 border-2 border-gray-400">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between">
        <div>
          <h1 className="font-bold text-xl mb-2 mt-4 lg:mt-0">Contact Us</h1>
          <p className=" text-md mb-2">💌 contact@openmicfinder.com</p>
          <a
            href="mailto:nitronate@gmail.com"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2rounded"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-2 rounded"
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
      </div>
    </footer>
  );
}
