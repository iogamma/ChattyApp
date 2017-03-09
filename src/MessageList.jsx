import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

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
          switch(message.type) {
            case 'postMessage':
              return (
                <Message
                  key={message.id}
                  message={{
                    username  : message.username,
                    content   : message.content
                  }}
                  nameColor={message.nameColor}
                />
              );
            case 'postNotification':
              return (
                <Notification
                  key={message.id}
                  notification={{
                    oldName : message.oldName,
                    newName : message.newName
                  }}
                  nameColor={message.nameColor}
                />
              );
            default:
              //TODO: ERROR HANDLING
          }
        })}
      </main>
    );
  }
}


export default MessageList;