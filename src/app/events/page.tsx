"use client";

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Event = {
  id: string;
  name: string;
  location: string;
  date: string;
  lat: number;
  lng: number;
};

type CityCoordinates = {
  [key: string]: { lat: number; lng: number };
};

const cityCoordinates: CityCoordinates = {
  "Spokane WA": { lat: 47.6588, lng: -117.426 },
  "Spokane Valley WA": { lat: 47.6733, lng: -117.2394 },
  "Coeur D alene ID": { lat: 47.6777, lng: -116.7805 },
  "Hayden ID": { lat: 47.766, lng: -116.7866 },
  "Post Falls ID": { lat: 47.718, lng: -116.9516 },
  "Sandpoint ID": { lat: 48.2766, lng: -116.5535 },
};

// Mock data for events
const mockEvents: Event[] = [
  {
    id: "1",
    name: "Comedy Night",
    location: "Spokane WA",
    date: "04-15-2023",
    lat: 47.6588,
    lng: -117.426,
  },
  {
    id: "2",
    name: "Open Mic",
    location: "Coeur D alene ID",
    date: "04-16-2023",
    lat: 47.6777,
    lng: -116.7805,
  },
  // ... add more events as needed
];

const EventsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateMapURL = (city: string) => {
    let lat, lng;

    if (cityCoordinates[city]) {
      ({ lat, lng } = cityCoordinates[city]);
    } else {
      // Default to Spokane coordinates
      ({ lat, lng } = cityCoordinates["Spokane WA"]);
    }

    const milesInDegree = 69; // Approximate miles in one degree
    const radius = 4; // 7 miles radius
    const delta = radius / milesInDegree;

    const bboxHalfWidth = delta; // Adjust for longitude
    const bboxHalfHeight = delta; // Adjust for latitude

    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      lng - bboxHalfWidth
    }%2C${lat - bboxHalfHeight}%2C${lng + bboxHalfWidth}%2C${
      lat + bboxHalfHeight
    }&amp;layer=mapnik&amp;marker=${lat}%2C${lng}`;
  };

  const mapURL = generateMapURL(selectedCity);

  const events = mockEvents.filter(
    (event) =>
      event.location.includes(selectedCity) &&
      new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold">Open Mic Events</h1>
      <h6 className="text-center my-2">Select your city to view events</h6>
      <div className="flex items-center my-4 space-x-4">
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="border p-2 text-black rounded-md"
        >
          <option value="">Select a City</option>
          <option value="Spokane WA">Spokane, WA</option>
          <option value="Spokane Valley WA">Spokane Valley, WA</option>
          <option value="Coeur D alene ID">Coeur D alene, ID</option>
          <option value="Hayden ID">Hayden, ID</option>
          <option value="Post Falls ID">PostFalls, ID</option>
          <option value="Sandpoint ID">Sandpoint, ID</option>
        </select>

        <ReactDatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="text-black p-2 rounded-md border"
        />
      </div>
      <div className="flex">
        {/* Event List */}
        <div className="w-1/2 bg-white text-black p-4 my-2 mr-2 rounded-md shadow">
          <h2 className="text-2xl font-semibold text-center">Events:</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="event-item">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p>{event.location}</p>
                <p>{event.date}</p>
                {/* Other event details */}
              </div>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>

        {/* Map Component */}
        <div className="w-1/2 bg-white text-black p-4 my-2 ml-2 rounded-md shadow">
          <iframe width="100%" height="300" src={mapURL}></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
