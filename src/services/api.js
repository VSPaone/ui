import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL if different
});

export const getEvents = () => API.get('/events');
export const getEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (event) => API.post('/events', event);
export const updateEvent = (id, event) => API.put(`/events/${id}`, event);
export const deleteEvent = (id) => API.delete(`/events/${id}`);