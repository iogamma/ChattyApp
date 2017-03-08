import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  componentDidMount() {
    let payload, newMessage;
    // Websocket
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      payload = JSON.parse(event.data);
      newMessage = {id: payload.id,
                    username: payload.username,
                    content: payload.content};
      this.setState((prevState) => {
        const messages = prevState.messages.concat(newMessage);
        return {messages};
      });
    }
  }

  constructor (props) {
    let ws;
    super(props);
    this.addMessageToList = this.addMessageToList.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      currentUser   : {username: "anonymous"},
      messages      : [],
      socket        : ws
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

  addMessageToList(username, content) {
    const newMessage = {username, content};
    this.socket.send(JSON.stringify(newMessage));
  }
}


export default App;
