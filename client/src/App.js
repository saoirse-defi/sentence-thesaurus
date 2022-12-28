import logo from './logo.svg';
import './App.css';
import './normalize.css';
import { useState } from 'react';

function App() {
  const [chatLog, setChatLog] = useState([{
    user: 'gpt',
    message: 'Let me help you with your English!',
  }, {
    user: 'me',
    message: 'I want to learn English!'
  }]);
  const [input, setInput] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    console.log("submitting");
    setChatLog([...chatLog, {user: 'me', message: `${input}`}]);
    setInput("");
    // fetch response from the api combining the chat log array of messages and send it to the localhost:3000 as a post
    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).join(' ')
      })
    });
    const data = await response.json();
    console.log(data);
    setChatLog([...chatLog, {user: 'gpt', message: data.data.choices[0].text}]);
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <h2>Sidemenu</h2>
        <div className="sidemenu-newchat">
          + Add
        </div>
      </aside>
      <section className="mainmenu">
        <h2>Mainmenu</h2>
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))}
        </div>
        <div className="mainmenu-chat">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e)=> setInput(e.target.value)}></input>
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
