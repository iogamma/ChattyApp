import React, {Component} from 'react';

class Message extends Component {

  componentDidMount() {
    console.log("componentDidMount <Message />");
  }

  render() {
    return (
      <div>
        {this.props.message.username} - {this.props.message.content}
      </div>
    );
  }
}

export default Message;