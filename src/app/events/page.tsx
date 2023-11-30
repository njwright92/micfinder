"use client";

import React, { useState, useRef, useContext, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { EventContext } from "../components/eventContext";
import GoogleMap from "../components/GoogleMap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";

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

const mockEvents: Event[] = [
  {
    id: "1",
    isRecurring: true,
    name: "New Talent Tuesday!",
    location: "Spokane Comedy Club, Spokane WA",
    date: "Tuesday",
    lat: 47.657017,
    lng: -117.4193719,
    details: `
      Every Tuesday, Featuring: Amateur and Professional comedians trying out new material. Free admission. Shows starting at 9:30pm or later are 21+, earlier shows are 18+ with valid ID. 
      Visit <a href="https://www.spokanecomedyclub.com/" target="_blank" style="text-decoration: underline; color: blue;">Spokane Comedy Club</a> for more info. 
      <a href="https://www.google.com/maps/place/Spokane+Comedy+Club/@47.657017,-117.4193719,17z/data=!3m1!4b1!4m6!3m5!1s0x549e1861e8e0198d:0xba09c4ee88e9b25e!8m2!3d47.657017!4d-117.416797!16s%2Fg%2F11cm6j1zpw?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.
    `,
  },
  {
    id: "2",
    isRecurring: true,
    name: "Open Mic Night!",
    location: "Spokane Comedy Club, Spokane WA",
    date: "Wednesday",
    lat: 47.657017,
    lng: -117.4193719,
    details: `
      Every Wednesday, A night with professional and first-time comedians. Free admission. Happy hour all night. 
      Sign-up for comedians available at <a href="https://www.barkentertainment.com/open-mic" target="_blank" style="text-decoration: underline; color: blue;">openmicer.com</a>. 
      <a href="https://www.google.com/maps/place/Spokane+Comedy+Club/@47.657017,-117.4193719,17z/data=!3m1!4b1!4m6!3m5!1s0x549e1861e8e0198d:0xba09c4ee88e9b25e!8m2!3d47.657017!4d-117.416797!16s%2Fg%2F11cm6j1zpw?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.
    `,
  },
  {
    id: "3",
    isRecurring: true,
    name: "Open Mic Stand Up Comedy!",
    location: "The Draft Zone, Post Falls ID",
    date: "Thursday",
    lat: 47.7057509,
    lng: -117.0270137,
    details: `
      Weekly open mic stand-up comedy event. Every Thursday through 1/24. Free admission. 
      Visit <a href="https://draftzonepf.com" target="_blank" style="text-decoration: underline; color: blue;">Draft Zone </a> for more info. <a href="https://www.google.com/maps/place/The+Draft+Zone/@47.7057509,-117.0270137,15z/data=!3m1!4b1!4m6!3m5!1s0x5361ddbc4da8868b:0xc1f752f8c519f0f4!8m2!3d47.7057379!4d-117.0085598!16s%2Fg%2F11gy3bsw8c?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.
    `,
  },
  {
    id: "4",
    isRecurring: true,
    name: "Quincy Belt Tournament of Champions!",
    location: "The Draft Zone, Post Falls ID",
    date: "Thursday",
    lat: 47.7057509,
    lng: -117.0270137,
    details: `Post Falls, ID. Entry: Online/In Person. Free entry, no content restrictions. 
    Qualify by winning the "Quincy Belt" at the open mic (Thursdays) or via video submission by 12/14. 
    Semifinals: 2/3/24, 3/2/24, 4/6/24, 5/4/24. Finals: 6/1/24. Prizes: 1st - $1000, 2nd - $500, 3rd/4th - $250 each. 
    Email: jaybergcomedy@gmail.com for details and entries. visit <a href="https://draftzonepf.com" target="_blank" style="text-decoration: underline; color: blue;">Draft Zone </a> for more info. <a href="https://www.google.com/maps/place/The+Draft+Zone/@47.7057509,-117.0270137,15z/data=!3m1!4b1!4m6!3m5!1s0x5361ddbc4da8868b:0xc1f752f8c519f0f4!8m2!3d47.7057379!4d-117.0085598!16s%2Fg%2F11gy3bsw8c?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.`,
  },
  {
    id: "5",
    isRecurring: true,
    name: "Open Mic",
    location:
      "The Goody Bar and Grill, 8712 E SPRAGUE AVE #1000, Spokane Valley WA",
    date: "Monday",
    lat: 47.6567246,
    lng: -117.2902616,
    details: `
      Hosted by Anthony Singleton, welcoming all talents including musicians, comedians, spoken word, and improv. 
      Contact: 509-557-3999 or visit <a href="https://www.lyyv.tv" target="_blank" style="text-decoration: underline; color: blue;">lyyv.tv</a> for more info. 
      <a href="https://www.google.com/maps/place/The+Goody+Bar+And+Grill/@47.6567246,-117.2902616,17z/data=!3m1!4b1!4m6!3m5!1s0x549e21c949eed8cb:0xbd4d1292f17e8c43!8m2!3d47.656721!4d-117.2876867!16s%2Fg%2F1trrcxqj?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.
    `,
  },
  {
    id: "6",
    isRecurring: true,
    name: "Stand Up Comedy Open Mic",
    location: "Spikes on 718 E Francis Spokane WA",
    date: "Saturday",
    lat: 47.7147076,
    lng: -117.4008385,
    details: `
      Hosted by Anthony Singleton. Every Saturday at 7:00 PM. For more information follow @AnthonySingleton on social media. 
      <a href="https://www.google.com/maps/place/Spike's+Spokane/@47.7147076,-117.4008385,17z/data=!3m1!4b1!4m6!3m5!1s0x549e1eb3e673dd89:0xb506914f6e09b6e2!8m2!3d47.714704!4d-117.3982636!16s%2Fg%2F11_fkyq8p?entry=ttu" target="_blank" style="text-decoration: underline; color: green;">View on Google Maps</a>.
    `,
  },
  {
    id: "7",
    isRecurring: true,
    name: "Open Mic Night at The Grain Shed",
    location: "The Grain Shed Taproom Spokane WA",
    date: "Friday",
    lat: 47.6561077,
    lng: -117.4348802,
    details: `
    Hosted by Anthony Singleton. Open Mic Night for music and comedy. 
    Every Friday from 5:30 PM to 8:30ish PM. All ages welcome. Clean mic. Free admission. 
    <a href="https://www.google.com/maps/place/The+Grain+Shed+Taproom/@47.6561077,-117.4348802,17z/data=!3m2!4b1!5s0x549e18680a2601e7:0x1a13f3af47308d34!4m6!3m5!1s0x549e194b26b6f1a1:0x6df1cdc8cd28c935!8m2!3d47.6561041!4d-117.4323053!16s%2Fg%2F11thk6c6yx?entry=ttu" ttarget="_blank" style="text-decoration: underline; color: green;">
      View on Google Maps
    </a>
  `,
  },
];

const EventsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePickerRef = useRef<any>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const { saveEvent } = useContext(EventContext);

  const handleEventSave = (event: Event) => {
    saveEvent(event);
  };

  const isRecurringEvent = (
    eventDate: string,
    selectedDate: Date,
    event: Event
  ): boolean => {
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

    if (eventDay !== selectedDay) {
      return false;
    }

    if (event.name !== "Open Mic") {
      return true;
    }

    const weekOfMonth = Math.floor((selectedDate.getDate() - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  const filteredEvents = events.filter((event) => {
    const isInSelectedCity =
      selectedCity === "" || event.location.includes(selectedCity);

    // Normalize dates for comparison
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // Set time to start of the day
    const normalizedSelectedDate = new Date(selectedDate);
    normalizedSelectedDate.setHours(0, 0, 0, 0);

    const isOnSelectedDate = event.isRecurring
      ? isRecurringEvent(event.date, selectedDate, event)
      : eventDate.toDateString() === normalizedSelectedDate.toDateString();

    return isInSelectedCity && isOnSelectedDate;
  });

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const selectedCityCoordinates =
    cityCoordinates[selectedCity] || cityCoordinates["Spokane WA"];

  const openDatePicker = () => {
    if (datePickerRef && datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedEvents = querySnapshot.docs.map((doc) => {
        const eventData = doc.data();
        // Convert Firestore timestamp to JavaScript Date object
        eventData.date = eventData.date.toDate();
        return {
          id: doc.id,
          ...eventData,
        };
      }) as Event[];

      setEvents((prevEvents) => {
        const newEvents = fetchedEvents.filter(
          (fe) => !prevEvents.some((pe) => pe.id === fe.id)
        );
        return [...prevEvents, ...newEvents];
      });
    };

    fetchEvents();
  }, []);

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
          className="modern-input"
        >
          <option value="">Select a City</option>
          <option value="Spokane WA">Spokane, WA</option>
          <option value="Spokane Valley WA">Spokane Valley, WA</option>
          <option value="Coeur D'Alene ID">Coeur D&apos;Alene, ID</option>
          <option value="Hayden ID">Hayden, ID</option>
          <option value="Post Falls ID">PostFalls, ID</option>
          <option value="Sandpoint ID">Sandpoint, ID</option>
        </select>
        <div className="relative">
          <ReactDatePicker
            ref={datePickerRef}
            id="datePicker"
            selected={selectedDate}
            onChange={handleDateChange}
            className="modern-input"
          />
          <CalendarIcon
            className="h-5 w-5 text-black absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={openDatePicker}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Event List */}
        <div className="events-card">
          <h2
            className="text-2xl font-semibold text-center"
            style={{ borderBottom: "0.15rem solid #005eff" }}
          >
            Events List:
          </h2>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-item">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="font-bold">Location: {event.location}</p>
                <div className="details font-bold">
                  <span className="details-label">ℹ️ Details:</span>
                  <div dangerouslySetInnerHTML={{ __html: event.details }} />
                </div>
                <button
                  className="neu-button mt-1 px-1 py-1"
                  onClick={() => handleEventSave(event)}
                >
                  Save Event
                </button>
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
        <div className="events-calendar">
          <GoogleMap
            lat={selectedCityCoordinates.lat}
            lng={selectedCityCoordinates.lng}
            events={filteredEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
