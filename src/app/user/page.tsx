"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { EventContext } from "../components/eventContext";

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { savedEvents } = useContext(EventContext);

  useEffect(() => {
    // Load user data logic
    setName("John Doe");
    setBio("Comedy enthusiast and amateur stand-up comedian.");
    // Load saved events and profile image similarly
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Saving Profile Data:", { name, bio, profileImage });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      <div className="user-card">
        {/* Profile Picture Section */}
        <div className="mb-6">
          <label htmlFor="profilePicture" className="label-text">
            Profile Picture:
          </label>
          {isEditing ? (
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={handleImageChange}
              className="standard-input"
            />
          ) : (
            profileImage && (
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                width={100}
                height={100}
                objectFit="cover"
                className="rounded-full"
              />
            )
          )}
        </div>

        {/* Name Section */}
        <div className="mb-6">
          <label htmlFor="name" className="label-text">
            Name:
          </label>
          {isEditing ? (
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="standard-input"
            />
          ) : (
            <p className="text-lg text-gray-800">{name}</p>
          )}
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <label htmlFor="bio" className="label-text">
            Bio:
          </label>
          {isEditing ? (
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="standard-input h-24"
            />
          ) : (
            <p className="text-gray-700">{bio}</p>
          )}
        </div>

        {/* Saved Events Section */}
        <div className="mb-6">
          <h2 className="text-2xl text-black font-bold mb-4">Saved Events</h2>
          {savedEvents.map((event) => (
            <div key={event.id} className="saved-event-item">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="font-bold">Location: {event.location}</p>
              <div className="details font-bold">
                <span className="details-label">ℹ️ Details:</span>
                <div dangerouslySetInnerHTML={{ __html: event.details }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing ? (
        <button onClick={handleSubmit} className="mt-2 neu-button px-2 py-1">
          Save Changes
        </button>
      ) : (
        <button onClick={handleEdit} className="mt-2 neu-button px-2 py-1">
          Edit Profile
        </button>
      )}
    </div>
  );
}
