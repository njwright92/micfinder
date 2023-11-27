"use client";

import React, { createContext, useState, ReactNode } from "react";

type Event = {
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

export const EventContext =
  createContext<EventContextType>(defaultContextValue);

type EventProviderProps = {
  children: ReactNode;
};

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  const saveEvent = async (event: Event) => {
    setSavedEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <EventContext.Provider value={{ savedEvents, saveEvent }}>
      {children}
    </EventContext.Provider>
  );
};
