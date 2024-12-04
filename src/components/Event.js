import React from 'react';

function Event({ event, onEdit, onDelete }) {
  return (
    <li>
      <strong>{event.name}</strong>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
      <div className='btns'>
        <button onClick={() => onEdit(event)}>Edit</button>
        <button onClick={() => onDelete(event._id)}>Delete</button>
      </div>
    </li>
  );
}

export default Event;
