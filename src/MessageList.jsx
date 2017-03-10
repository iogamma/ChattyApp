import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'
import Image from './Image.jsx'

class MessageList extends Component {

//-------------------- Lifecycle Methods

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
            case 'postImage':
              return(
                <Image
                  key={message.id}
                  nameColor={message.nameColor}
                  imageURL={message.imageURL}
                  username={message.username}
                />
              );
            default:
              alert('Cannot render your content in MessageList');
          }
        })}
      </main>
    );
  }
}

export default MessageList;