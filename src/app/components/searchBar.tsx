import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="flex items-center">
      {isInputVisible && (
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search city to view events.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 rounded-l-lg text-black"
          />
        </form>
      )}
      <button
        onClick={() => setInputVisible(!isInputVisible)}
        className="ml-2 px-2 py-1 bg-white text-black rounded-full"
      >
        <MagnifyingGlassIcon className="h-7 w-7" />
      </button>
    </div>
  );
}
