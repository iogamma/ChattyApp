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
          id_key   : "1",
          username : "Bobby Flay",
          content  : "I have a new show on Food Network!"
        },
        {
          id_key   : "2",
          username : "Anonymous",
          content  : "I love your shows Bobby! Congrats!"
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
