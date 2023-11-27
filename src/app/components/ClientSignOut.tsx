"use client";

import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const ClientOnlySignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Sign-out successful.
      alert("Signed out successfully");
    } catch (e) {
      if (e instanceof Error) {
        alert(`Error signing out: ${e.message}`);
      } else {
        alert("Unknown error occurred");
      }
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="mt-1 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition-colors"
    >
      <ArrowRightOnRectangleIcon className="inline-block h-4 w-4 mr-1" />
      Sign Out
    </button>
  );
};

export default ClientOnlySignOutButton;
