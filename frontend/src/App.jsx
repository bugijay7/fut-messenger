import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessagesList';

const API_URL = 'http://localhost:3000/api/messages';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!username || !message) return;
    try {
      await axios.post(API_URL, { username, message });
      setUsername('');
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteAll = async () => {
    try {
      await axios.delete(API_URL);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  return (
    <div className="container">
      <h1>Messenger</h1>
      <MessageForm
        username={username}
        setUsername={setUsername}
        message={message}
        setMessage={setMessage}
        onSend={sendMessage}
        onDelete={deleteAll}
      />
      <MessageList messages={messages} />
    </div>
  );
}

export default App;
