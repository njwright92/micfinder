"use client";

import React, { useEffect, useState, useCallback } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import ClientOnlySignOutButton from "./ClientSignOut";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Import User here

export default function Footer() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const handleAuthStateChanged = useCallback((user: User | null) => {
    // User or null
    setIsUserSignedIn(!!user);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => unsubscribe();
  }, [handleAuthStateChanged]);

  return (
    <footer className="bg-white text-black text-center p-1">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h3 className="font-bold text-lg border-b-2 border-black">
            Contact Us
          </h3>
          <p className="flex items-center justify-center lg:justify-start">
            <EnvelopeIcon className="h-4 w-4 mr-1 ml-1" />
            contact@openmicfinder.com
          </p>
          <p className="flex items-center justify-center lg:justify-start">
            <PhoneIcon className="h-4 w-4 mr-1 ml-1" />
            +1 234 567 890
          </p>
        </div>
        {isUserSignedIn && (
          <div className="mt-4 lg:mt-0">
            <ClientOnlySignOutButton />
          </div>
        )}
      </div>
      <p>© {new Date().getFullYear()} OpenMicFinder</p>
    </footer>
  );
}
