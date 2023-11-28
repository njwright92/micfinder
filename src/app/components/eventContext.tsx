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
}

const defaultContextValue: EventContextType = {
  savedEvents: [],
  saveEvent: () => Promise.resolve(),
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

    const userEventsRef = doc(db, "userEvents", user.uid);
    const newEvents = [...savedEvents, event];
    await setDoc(userEventsRef, { events: newEvents }, { merge: true });
    setSavedEvents(newEvents);
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
    await saveEventToFirestore(event); // Save to Firestore
  };

  return (
    <EventContext.Provider value={{ savedEvents, saveEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext };
