import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUser: {name: anonymous},
      messages: []
    }
 }
  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages= />
        <Chatbar name={currentUser}/>
      </div>
    );
  }
}
export default App;
