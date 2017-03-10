import React, {Component} from 'react';
import Chatbar            from './Chatbar.jsx';
import MessageList        from './MessageList.jsx';
import Nav                from './Nav.jsx';

class App extends Component {

  //---------- Lifecyle Methods

  constructor (props) {
    let ws;
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setServerData = this.setServerData.bind(this);
    this.addImage = this.addImage.bind(this);
    this.state = {
      currentUser : {username: 'anonymous'},
      messages    : [],
      numOfUsers  : 0,
      socket      : ws
    };
  }

  render() {
    return (
      <div>
        <Nav numOfUsers={this.state.numOfUsers} />
        <MessageList messages={this.state.messages} />
        <Chatbar currUsername={this.state.currentUser.username}
                 addMessage={this.addMessage}
                 addNotification={this.addNotification}
                 addImage={this.addImage}
        />
      </div>
    );
  }

  componentDidMount() {
    // Create a websocket connection
    this.socket = new WebSocket('ws://localhost:3001');
    // Socket event listener definition
    this.socket.onmessage = (event) => {
      let serverData = JSON.parse(event.data);
      this.setServerData(serverData);
    }
  }

  //---------- Property Methods

  addMessage(username, content) {
    const newMessage = {
      content  : content,
      type     : 'incomingMessage',
      username : username
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addNotification(oldName, newName) {
    const newMessage = {
      newName : newName,
      oldName : oldName,
      type    : 'incomingNotification'
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addImage(username, imageURL) {
    const newMessage = {
      imageURL : imageURL,
      type     : 'incomingImage',
      username : username
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  //--------- Helper Methods

  setServerData(serverData) {
    let messages;
    switch(serverData.type) {
      case 'userCountUpdate':
        this.setState({numOfUsers: serverData.userCount})
        break;
      default:
        this.setState((prevState) => {
          messages = prevState.messages.concat(serverData);
          return {messages};
        });
    }
  }
}

export default App;
