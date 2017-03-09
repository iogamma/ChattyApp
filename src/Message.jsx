import React, {Component} from 'react';

class Message extends Component {

  componentDidMount() {
    console.log("componentDidMount <Message />");
  }

  render() {
    return (
      <div className="message">
        <span className="message-username" style={{color: 'blue'}}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default Message;