import React from "react";
import { useState } from "react";

export function ChatForm() {
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "Im your GPT-3 chatbot. Ask me anything!",
    },
  ]);
  const [details, setDetails] = React.useState({
    input: "",
    temp: 0.5,
  });

  function handleChange(evt) {
    console.log(evt.target);
    const name = evt.target.name;
    const value = evt.target.value;

    setDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });
    console.log(details);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
    setChatLog([...chatLog, { user: "me", message: `${details.input}` }]);
    setDetails({ input: details.input, temp: details.temp });
    // fetch response from the api combining the chat log array of messages and send it to the localhost:3000 as a post
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).join(" "),
      }),
    });
    const data = await response.json();
    console.log(data.message);
    setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        rows="1"
        name="input"
        value={details.input}
        onChange={handleChange}
      ></input>
      <input
        name="temp"
        value={details.temp}
        onChange={handleChange}
        type="range"
        min="0.1"
        max="1"
        step="0.1"
      ></input>
    </form>
  );
}
