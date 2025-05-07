import React from 'react';

const MessageList = ({ messages }) => (
  <ul>
    {messages.map((msg) => (
      <li key={msg.id}>
        <strong>{msg.username}</strong>: {msg.message} <em>{msg.created_at}</em>
      </li>
    ))}
  </ul>
);

export default MessageList;
