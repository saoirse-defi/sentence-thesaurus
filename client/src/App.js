import logo from './logo.svg';
import './App.css';
import './normalize.css';
import { useState } from 'react';

function App() {
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: 'Im your GPT-3 chatbot. Ask me anything!',
  }]);

  const [details, setDetails] = useState({
    input: "",
    temp: 0.5,
  });

  function clearChat(){
    setChatLog([]);
  }

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
    e.target.reset();
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <h2>Sidemenu</h2>
        <div className="sidemenu-newchat" onClick={clearChat}>
          + New 
        </div>
      </aside>
      <section className="mainmenu">
        <h2>AI Companion</h2>
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))}
        </div>
        <div className="mainmenu-chat">
        <form onSubmit={handleSubmit}>
          <input
            rows="1"
            name="input"
            onChange={handleChange}
          ></input>
          <input
            name="temp"
            onChange={handleChange}
            type="range"
            min="0.1"
            max="1"
            step="0.1"
          ></input>
        </form>
          
        </div>
      </section>
      
    </div>
  );
}

const ChatMessage = ({message}) => {
  return(
    <div className={`chat-message ${message.user === 'gpt' && "chatgpt"}`}>
      <div className={`avatar ${message.user === 'gpt' && "chatgpt"}`}>
        {message.user === 'gpt' ? 'GPT' : 'Me'}
      </div>
      <div className="message">
        {message.message}
      </div>
    </div>
  )
}

export default App;
