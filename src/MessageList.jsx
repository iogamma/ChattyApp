import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    return (
      <main className="messages">
        <div>
          {this.props.messages.map((message) => {
            return <div>{message.username}</div>
          }) }
        </div>
      </main>
    );
  }
}

export default MessageList;