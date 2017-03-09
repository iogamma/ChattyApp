import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Message extends Component {

  componentDidMount() {
    console.log("componentDidMount <Message />");
    ReactDOM.findDOMNode(this)
            .scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  render() {
    return (
      <div className="message">
        <span className="message-username" style={{color: this.props.nameColor}}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default Message;