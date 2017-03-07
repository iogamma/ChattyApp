import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: {username: "anonymous"},
      messages: [
        {
          username: "Bobby Flay",
          content: "I have a new show on Food Network!"
        },
        {
          username: "Anonymous",
          content: "I love your shows Bobby! Congrats!"
        }
      ]
    };
 }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar username={this.state.currentUser.username} />
      </div>
    );
  }
}
export default App;
