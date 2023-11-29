"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";

export type Event = {
  id: string;
  name: string;
  location: string;
  date: string;
  lat: number;
  lng: number;
  details: string;
  isRecurring: boolean;
};

interface EventContextType {
  savedEvents: Event[];
  saveEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>; // New method for deleting an event
}

const defaultContextValue: EventContextType = {
  savedEvents: [],
  saveEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
};

const EventContext = createContext<EventContextType>(defaultContextValue);

type EventProviderProps = {
  children: ReactNode;
};

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  // Function to save event to Firestore
  const saveEventToFirestore = async (event: Event) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    // Check if the event already exists in the savedEvents array
    const eventAlreadySaved = savedEvents.some((e) => e.id === event.id);

    if (!eventAlreadySaved) {
      const userEventsRef = doc(db, "userEvents", user.uid);
      const newEvents = [...savedEvents, event];
      await setDoc(userEventsRef, { events: newEvents }, { merge: true });
      setSavedEvents(newEvents);
    }
  };

  const deleteEventFromFirestore = async (eventId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    try {
      const updatedEvents = savedEvents.filter((event) => event.id !== eventId);
      const userEventsRef = doc(db, "userEvents", user.uid);
      await setDoc(userEventsRef, { events: updatedEvents }, { merge: true });
      setSavedEvents(updatedEvents);
      alert("Event deleted successfully."); // Success alert
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event."); // Error alert
    }
  };

  // Function to fetch events from Firestore
  const fetchEventsFromFirestore = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userEventsRef = doc(db, "userEvents", user.uid);
    const docSnap = await getDoc(userEventsRef);
    if (docSnap.exists()) {
      setSavedEvents(docSnap.data().events);
    }
  };

  // useEffect to fetch events when component mounts
  useEffect(() => {
    fetchEventsFromFirestore();
  }, []);

  // Updated saveEvent function
  const saveEvent = async (event: Event) => {
    try {
      await saveEventToFirestore(event); // Save to Firestore
      alert("Event saved to profile."); // Success alert
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event."); // Error alert
    }
  };

  return (
    <EventContext.Provider
      value={{ savedEvents, saveEvent, deleteEvent: deleteEventFromFirestore }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventContext };
