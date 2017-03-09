import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import Nav  from './Nav.jsx';

class App extends Component {

  constructor (props) {
    let ws;
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setServerData = this.setServerData.bind(this);
    this.state = {
      currentUser   : {username: "anonymous"},
      messages      : [],
      numOfUsers    : 0,
      socket        : ws
    };
  }

  componentDidMount() {
    // Websocket
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      let serverData = JSON.parse(event.data);
      this.setServerData(serverData);
    }
  }

  render() {
    return (
      <div>
        <Nav numOfUsers={this.state.numOfUsers} />
        <MessageList messages={this.state.messages} />
        <Chatbar currUsername={this.state.currentUser.username}
                 addMessage={this.addMessage}
                 addNotification={this.addNotification}
        />
      </div>
    );
  }

  addMessage(username, content) {
    const newMessage = {username, content};
    newMessage.type = "incomingMessage";
    this.socket.send(JSON.stringify(newMessage));
  }

  addNotification(oldName, newName) {
    const newNotification = {oldName, newName};
    newNotification.type = "incomingNotification";
    this.socket.send(JSON.stringify(newNotification));
  }

  setServerData(serverData) {
    let newMessage, newUserCount, messages;
    switch(serverData.type) {
      case 'postMessage':
        newMessage = { content  : serverData.content,
                       id       : serverData.id,
                       type     : 'postMessage',
                       username : serverData.username
                     };
        this.setState((prevState) => {
          messages = prevState.messages.concat(newMessage);
          return {messages};
        });
        break;
      case 'postNotification':
        newMessage =  { id      : serverData.id,
                        newName : serverData.newName,
                        oldName : serverData.oldName,
                        type    : 'postNotification'
                      };
        this.setState((prevState) => {
          messages = prevState.messages.concat(newMessage);
          return {messages};
        });
        break;
      case 'userCountUpdate':
        newUserCount = serverData.userCount;
        this.setState({numOfUsers: newUserCount});
        break;
      default:
        throw new Error(`Unknown datatype returned from server ${serverData.type}`);
    }
  }
}

export default App;
