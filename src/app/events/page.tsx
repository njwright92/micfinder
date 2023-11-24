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
  details: string;
  isRecurring: boolean;
};

type CityCoordinates = {
  [key: string]: { lat: number; lng: number };
};

const cityCoordinates: CityCoordinates = {
  "Spokane WA": { lat: 47.6588, lng: -117.426 },
  "Spokane Valley WA": { lat: 47.6733, lng: -117.2394 },
  "Coeur D'Alene ID": { lat: 47.6777, lng: -116.7805 },
  "Hayden ID": { lat: 47.766, lng: -116.7866 },
  "Post Falls ID": { lat: 47.718, lng: -116.9516 },
  "Sandpoint ID": { lat: 48.2766, lng: -116.5535 },
};

// Mock data for events
const mockEvents: Event[] = [
  {
    id: "1",
    isRecurring: true,
    name: "New Talent Tuesday!",
    location: "Spokane Comedy Club, Spokane WA",
    date: "Tuesday",
    lat: 47.681365,
    lng: -117.7429849,
    details: `Every Tuesday, Featuring: Amateur and Professional comedians trying out new material. Free admission. Shows starting at 9:30pm or later are 21+, earlier shows are 18+ with valid ID. visit visit <a href="https://www.spokanecomedyclub.com/" target="_blank" style="text-decoration: underline; color: blue;">Spokane Comedy Club</a> for more info.`,
  },
  {
    id: "2",
    isRecurring: true,
    name: "Open Mic Night!",
    location: "Spokane Comedy Club, Spokane WA",
    date: "Wednesday",
    lat: 47.681365,
    lng: -117.7429849,
    details: `Every Wednesday, A night with professional and first-time comedians. Free admission. Happy hour all night. Sign-up for comedians available at <a href="https://www.barkentertainment.com/open-mic" target="_blank" style="text-decoration: underline; color: blue;">openmicer.com</a>.`,
  },
  {
    id: "3",
    isRecurring: true,
    name: "Open Mic Stand Up Comedy!",
    location: "The Draft Zone, Post Falls ID",
    date: "Thursday",
    lat: 47.7057415,
    lng: -117.0111401,
    details: `Weekly open mic stand-up comedy event. every Thursday through 1/24. Free admission. visit <a href="https://draftzonepf.com" target="_blank" style="text-decoration: underline; color: blue;">Draft Zone </a> for more info.`,
  },
  {
    id: "4",
    isRecurring: true,
    name: "Quincy Belt Tournament of Champions!",
    location: "The Draft Zone, Post Falls ID",
    date: "Thursday",
    lat: 47.7057415,
    lng: -117.0111401,
    details: `Post Falls, ID. Entry: Online/In Person. Free entry, no content restrictions. 
    Qualify by winning the "Quincy Belt" at the open mic (Thursdays) or via video submission by 12/14. 
    Semifinals: 2/3/24, 3/2/24, 4/6/24, 5/4/24. Finals: 6/1/24. Prizes: 1st - $1000, 2nd - $500, 3rd/4th - $250 each. 
    Email: jaybergcomedy@gmail.com for details and entries. visit <a href="https://draftzonepf.com" target="_blank" style="text-decoration: underline; color: blue;">Draft Zone </a> for more info.`,
  },
  {
    id: "5",
    isRecurring: true,
    name: "Open Mic",
    location:
      "The Goody Bar and Grill, 8712 E SPRAGUE AVE #1000, Spokane Valley WA",
    date: "Monday",
    lat: 47.657,
    lng: -117.239,
    details: `Hosted by Anthony Singleton, welcoming all talents including musicians, comedians, spoken word, and improv. Contact: 509-557-3999 or visit <a href="https://www.lyyv.tv" target="_blank" style="text-decoration: underline; color: blue;">lyyv.tv </a> for more info.`,
  },
  {
    id: "6",
    isRecurring: true,
    name: "Stand Up Comedy Open Mic",
    location: "Spikes on 718 E Francis Spokane WA",
    date: "Saturday",
    lat: 47.71,
    lng: -117.4,
    details:
      "Hosted by Anthony Singleton. Every Saturday at 7:00 PM. For more information follow @AnthonySingleton on social media",
  },
  {
    id: "7",
    isRecurring: true,
    name: "Open Mic Night at The Grain Shed",
    location: "The Grain Shed Taproom Spokane WA",
    date: "Friday",
    lat: 47.65,
    lng: -117.435,
    details:
      "Hosted by Anthony Singleton. Open Mic Night for music and comedy. Every Friday from 5:30 PM to 8:30ish PM. All ages welcome. Clean mic. Free admission.",
  },
];

const EventsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isRecurringEvent = (
    eventDate: string,
    selectedDate: Date,
    event: Event
  ): boolean => {
    // This checks if the selectedDate is the same day of the week as the eventDate
    const dayOfWeekMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const eventDay = dayOfWeekMap[eventDate];
    const selectedDay = selectedDate.getDay();

    // First, ensure the day of the week matches
    if (eventDay !== selectedDay) {
      return false;
    }

    // If the event is not the "Open Mic" event, it's a weekly event, so return true
    if (event.name !== "Open Mic") {
      return true;
    }

    // If it is the "Open Mic" event, check if it's the 2nd or 4th Monday of the month
    const weekOfMonth = Math.floor((selectedDate.getDate() - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  const filteredEvents = mockEvents.filter((event) => {
    const isInSelectedCity =
      selectedCity === "" || event.location.includes(selectedCity);
    const isOnSelectedDate = event.isRecurring
      ? isRecurringEvent(event.date, selectedDate, event)
      : new Date(event.date).toDateString() === selectedDate.toDateString();

    return isInSelectedCity && isOnSelectedDate;
  });

  const generateMapURL = (city: string) => {
    let lat, lng;

    if (cityCoordinates[city]) {
      ({ lat, lng } = cityCoordinates[city]);
    } else {
      // Default to Spokane coordinates
      ({ lat, lng } = cityCoordinates["Spokane WA"]);
    }

    const milesInDegree = 69; // Approximate miles in one degree
    const radius = 2; // Approximate radius in miles
    const delta = radius / milesInDegree;

    const bboxHalfWidth = delta; // Adjust for longitude
    const bboxHalfHeight = delta; // Adjust for latitude

    // Construct map URL
    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      lng - bboxHalfWidth
    }%2C${lat - bboxHalfHeight}%2C${lng + bboxHalfWidth}%2C${
      lat + bboxHalfHeight
    }&amp;layer=mapnik`;
  };

  const mapURL = generateMapURL(selectedCity);

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
      <div className="flex justify-center my-4 space-x-4">
        <select
          id="citySelect"
          name="selectedCity"
          value={selectedCity}
          onChange={handleCityChange}
          className="border p-2 text-black rounded-md"
        >
          <option value="">Select a City</option>
          <option value="Spokane WA">Spokane, WA</option>
          <option value="Spokane Valley WA">Spokane Valley, WA</option>
          <option value="Coeur D'Alene ID">Coeur D&apos;alene, ID</option>
          <option value="Hayden ID">Hayden, ID</option>
          <option value="Post Falls ID">PostFalls, ID</option>
          <option value="Sandpoint ID">Sandpoint, ID</option>
        </select>

        <ReactDatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          className="text-black p-2 rounded-md border"
        />
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Event List */}
        <div className="w-full lg:w-1/2 bg-white text-black p-4 my-2 rounded-md">
          <h2 className="text-2xl font-semibold text-center">Events:</h2>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-item">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p>{event.location}</p>
                <div dangerouslySetInnerHTML={{ __html: event.details }} />
              </div>
            ))
          ) : (
            <p>
              No events found for {selectedCity || "the selected city"} on{" "}
              {selectedDate.toLocaleDateString()}.
            </p>
          )}
        </div>

        {/* Map Component */}
        <div className="w-full lg:w-1/2 lg:ml-4 bg-white text-black p-4 my-2 rounded-md">
          <iframe
            width="100%"
            height="300"
            src={mapURL}
            style={{ border: ".25em solid black" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
