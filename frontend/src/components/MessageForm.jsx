import React from 'react';

const MessageForm = ({ username, setUsername, message, setMessage, onSend, onDelete }) => (
  <form onSubmit={onSend}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="text"
      placeholder="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit">Send</button>
    <button type="button" onClick={onDelete} className="delete">
      Delete All
    </button>
  </form>
);

export default MessageForm;
