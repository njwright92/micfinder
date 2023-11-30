"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Modal from "./modal";

const submitEvent = async (eventData: EventData) => {
  try {
    await addDoc(collection(db, "events"), eventData);
  } catch (error) {
    console.error("Error adding event: ", error);
  }
};

interface EventData {
  name: string;
  location: string;
  date: Date | null;
  lat: number;
  lng: number;
  details: string;
  isRecurring: boolean;
}

const EventForm: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState<EventData>({
    name: "",
    location: "",
    date: null,
    lat: 0,
    lng: 0,
    details: "",
    isRecurring: false,
  });

  const [formErrors, setFormErrors] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event.name || !event.location || !event.date || !event.details) {
      setFormErrors("Please fill in all required fields.");
      return;
    }

    setFormErrors(""); // Clear any previous errors
    try {
      await submitEvent(event);
      setShowModal(false);
      alert(
        "Event has been added successfully! Check the events page to view!"
      );
    } catch (error) {
      console.error("Error adding event: ", error);
      setFormErrors("Failed to add the event. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convert value to a number for 'lat' and 'lng' fields
    if (name === "lat" || name === "lng") {
      const numberValue = value === "" ? 0 : parseFloat(value);
      setEvent({ ...event, [name]: numberValue });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
        onClick={() => setShowModal(true)}
      >
        Add Event
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="form-container">
          {formErrors && <p className="text-red-500">{formErrors}</p>}
          <h1 className="text-2xl font-bold text-center text-black mt-4">
            Add Event Form
          </h1>
          <p className="text-red-500 text-center mb-1">
            Please fill in all fields correctly. Then submit, and your event
            will be added!
          </p>
          <div className="form-container">
            <label htmlFor="eventName" className="the-text">
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="standard-input"
              required
            />
          </div>

          <div className="form-container">
            <label htmlFor="location" className="the-text">
              Location (Format: City State without comma):
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              className="standard-input"
              required
            />
          </div>

          <div className="form-container">
            <label htmlFor="details" className="the-text">
              Details:
            </label>
            <textarea
              id="details"
              name="details"
              value={event.details}
              onChange={handleChange}
              className="standard-input"
              required
            />
          </div>

          <div className="form-container">
            <label htmlFor="latitude" className="the-text">
              Latitude (Get coordinates from Google Maps):
            </label>
            <input
              type="number"
              id="latitude"
              name="lat"
              value={event.lat}
              onChange={handleChange}
              className="standard-input"
              required
            />
          </div>

          <div className="form-container">
            <label htmlFor="longitude" className="the-text">
              Longitude (Get coordinates from Google Maps):
            </label>
            <input
              type="number"
              id="longitude"
              name="lng"
              value={event.lng}
              onChange={handleChange}
              className="standard-input"
              required
            />
          </div>

          <div className="form-container">
            <label className="the-text">Is Recurring?:</label>
            <div>
              <label htmlFor="isRecurringYes" className="the-text">
                Yes
              </label>
              <input
                type="checkbox"
                id="isRecurringYes"
                name="isRecurring"
                checked={event.isRecurring === true}
                onChange={() => setEvent({ ...event, isRecurring: true })}
                className="standard-input"
              />

              <label htmlFor="isRecurringNo" className="the-text">
                No
              </label>
              <input
                type="checkbox"
                id="isRecurringNo"
                name="isRecurring"
                checked={event.isRecurring === false}
                onChange={() => setEvent({ ...event, isRecurring: false })}
                className="standard-input"
              />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="date" className="the-text">
              Date:
            </label>
            <DatePicker
              id="date"
              selected={event.date ? new Date(event.date) : null}
              onChange={(date: Date | null) => setEvent({ ...event, date })}
              placeholderText={`📅 ${new Date().toLocaleDateString()}`}
              className="standard-input text-black"
            />
          </div>
          <button type="submit" className="neu-button py-1 px-2 mb-3">
            Submit Event
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EventForm;
