import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  componentDidMount() {
    // Websocket
    this.socket = new WebSocket ("ws://localhost:3001");
  }

  constructor (props) {
    let ws;

    super(props);
    this.addMessageToList = this.addMessageToList.bind(this);
    this.state = {
      currentUser   : {username: "anonymous"},
      messages      : [{
          id: 1,
          username: "Bobby Flay",
          content: "I have a new show on Food Network!"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "I love your shows Bobby! Congrats!"
        }],
      socket            : ws
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar currUsername={this.state.currentUser.username}
                 addMessageToList={this.addMessageToList}
        />
      </div>
    );
  }

  addMessageToList(username, message) {
    const newMessage = {id: Date.now(), username: username, content: message};
    this.setState((prevState) => {
      const messages = prevState.messages.concat(newMessage);
      return {messages};
    });
  }
}
export default App;
