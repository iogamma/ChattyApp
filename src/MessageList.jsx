import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  componentDidMount() {
    console.log('componentDidMount <MessageList />');
  }

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <main className='messages'>
        {this.props.messages.map((message) => {
          return (
            <Message
              key={message.id}
              message={{
                username: message.username,
                content : message.content
              }}
            />
          );
        })}
      </main>
    );
  }
}


export default MessageList;