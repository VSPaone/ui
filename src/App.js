import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from './services/api';
import Event from './components/Event';
import './App.css'

function App() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [editingEventId, setEditingEventId] = useState(null); // Stores the ID of the event being edited

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleFormSubmit = async () => {
    if (!eventName || !eventDescription) return;

    try {
      if (editingEventId) {
        // Update existing event
        await updateEvent(editingEventId, {
          name: eventName,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
          location: eventLocation,
        });
        setEditingEventId(null);
      } else {
        // Create new event
        await createEvent({
          name: eventName,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
          location: eventLocation,
        });
      }

      fetchEvents();
      setEventName('');
      setEventDescription('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (event) => {
    setEventName(event.name);
    setEventDescription(event.description);
    setEventDate(event.date);
    setEventTime(event.time);
    setEventLocation(event.location);
    setEditingEventId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container">
      <h1>Event Management System</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Event Date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Event Time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <button onClick={handleFormSubmit}>
          {editingEventId ? 'Update Event' : 'Add Event'}
        </button>
      </div>
      <ul className="todo-list">
        {events.map((event) => (
          <Event
            key={event._id}
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;