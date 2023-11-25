"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  HomeModernIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import AuthModal from "./authModal";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  return (
    <>
      <header className="bg-blue-900 text-white p-1">
        <nav className="container mx-auto flex justify-between items-center py-2">
          <Link
            href="/"
            className="neu-button ml-4 text-white px-2 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
          >
            <HomeModernIcon className="inline-block h-4 w-4 mr-1" />
            MicFinder
          </Link>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="neu-button px-2 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <InformationCircleIcon className="inline-block h-4 w-4 mr-1" />
              About
            </Link>
            <Link
              href="/events"
              className="neu-button text-white px-2 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <CalendarDaysIcon className="inline-block h-4 w-4 mr-1" />
              Events
            </Link>
            <button
              onClick={toggleAuthModal}
              className="neu-button text-white px-2 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <UserCircleIcon className="inline-block h-4 w-4 mr-1" />
              Sign In/Up
            </button>
            <Link
              href="/user"
              className="neu-button mr-4 text-white px-2 py-2 rounded-lg shadow-md hover:shadow-inner transition duration-300"
            >
              <UserIcon className="inline-block h-4 w-4 mr-1" />
              Profile
            </Link>
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </>
  );
}
