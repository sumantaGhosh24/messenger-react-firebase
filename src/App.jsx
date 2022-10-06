import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, Input} from "@material-ui/core";
import firebase from "firebase/compat/app";

import "./App.css";
import Message from "./Message";
import {db} from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, {username: username, message: input}]);
    setInput("");
  };

  return (
    <div className="App">
      <p>messenger clone</p>
      <h2>Welcome {username}</h2>
      {!username && "for accessing this app, you need to enter your username"}

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Your Message</InputLabel>
          <Input
            disabled={!username}
            id="my-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={sendMessage}
        >
          send message
        </Button>
      </form>

      {messages.map((message) => (
        <Message message={message} username={username} />
      ))}
    </div>
  );
}

export default App;
