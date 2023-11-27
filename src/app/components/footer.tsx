"use client";

import React, { useEffect, useState, useCallback } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import ClientOnlySignOutButton from "./ClientSignOut";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Footer() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const handleAuthStateChanged = useCallback((user: firebase.User) => {
    setIsUserSignedIn(!!user);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => unsubscribe();
  }, [handleAuthStateChanged]);

  return (
    <footer className="bg-white text-black text-center p-1">
      <div className="container mx-auto">
        <h3 className="font-bold text-lg">Contact Us</h3>
        <p className="flex items-center justify-center">
          <EnvelopeIcon className="h-4 w-4 mr-1" />
          contact@openmicfinder.com
        </p>
        {isUserSignedIn && <ClientOnlySignOutButton />}
        <p className="flex items-center justify-center">
          <PhoneIcon className="h-5 w-5 mr-1" />
          +1 234 567 890
        </p>
      </div>
      <p>© {new Date().getFullYear()} OpenMicFinder</p>
    </footer>
  );
}
