"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { EventContext, Event } from "../components/eventContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebase.config";

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { saveEvent, savedEvents, deleteEvent } = useContext(EventContext);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile data
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name);
            setBio(userData.bio);
            setProfileImageUrl(userData.profileImageUrl);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

        // Fetch and set events
        try {
          const userEventsRef = doc(db, "userEvents", user.uid);
          const docSnapEvents = await getDoc(userEventsRef);
          if (docSnapEvents.exists() && docSnapEvents.data().events) {
            const eventsFromFirestore: Event[] = docSnapEvents.data().events; // Use Event type
            eventsFromFirestore.forEach((event: Event) => {
              // Specify type for event
              if (!savedEvents.some((e) => e.id === event.id)) {
                saveEvent(event);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching user events:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, saveEvent, savedEvents]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);

      // Upload the file to Firebase Storage and get the URL
      const storageRef = ref(storage, `profileImages/${auth.currentUser?.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfileImageUrl(url);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            name,
            bio,
            profileImageUrl,
          },
          { merge: true }
        ); // merge: true will update the document if it exists
        setIsEditing(false);
        console.log("Profile updated");
      } catch (error) {
        console.error("Error updating/creating profile:", error);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId); // Call deleteEvent from context
    // You might want to add some UI feedback or error handling here
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
          <label htmlFor="profilePicture" className="the-text">
            Profile Picture:
          </label>
          {isEditing ? (
            <>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={handleImageChange}
                className="standard-input"
              />
              {profileImage && (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="profile-image"
                />
              )}
            </>
          ) : (
            profileImageUrl && (
              <Image
                src={profileImageUrl}
                alt="Profile Preview"
                width={100}
                height={100}
                className="profile-image"
              />
            )
          )}
        </div>

        {/* Name Section */}
        <div className="mb-6">
          <label htmlFor="name" className="the-text">
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
          <label htmlFor="bio" className="the-text">
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
          <h2 className="text-2xl text-black font-bold mb-4 event-card">
            Saved Events
          </h2>
          {savedEvents.map((event) => (
            <div key={event.id} className="event-item">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="font-bold">Location: {event.location}</p>
              <div className="details font-bold">
                <span className="details-label">ℹ️ Details:</span>
                <div dangerouslySetInnerHTML={{ __html: event.details }} />
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
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
