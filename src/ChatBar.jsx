import React, {Component} from 'react';

class Chatbar extends Component {

  constructor (props) {
    super(props);
    this.onKeyEnterMsg = this.onKeyEnterMsg.bind(this);
    this.onKeyEnterUsername = this.onKeyEnterUsername.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.onBlurUsername = this.onBlurUsername.bind(this);
    this.state = {
      currUsername: this.props.currUsername,
      username: this.props.currUsername,
      content: ''
    }
  }

  componentDidMount() {
    console.log('componentDidMount <ChatBar />');
  }

  render() {

    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
               placeholder='Your Name (Optional)'
               onBlur={this.onBlurUsername}
               onKeyDown={this.onKeyEnterUsername} value={this.state.username}
               onChange={this.onChangeUsername}
               type='text'
               value={this.state.currUsername}
        />
        <input className='chatbar-message'
               placeholder='Type a message and hit ENTER'
               onKeyDown={this.onKeyEnterMsg}
               onChange={this.onChangeMsg}
               type='text'
               value={this.state.content}
        />
      </footer>
    );
  }

  onBlurUsername(event) {
    this.setState({currUsername: this.state.username})
  }

  onChangeMsg(event) {
    this.setState({content: event.target.value});
  }

  onChangeUsername(event) {
    this.setState({currUsername: event.target.value});
  }

  onKeyEnterUsername(event) {
    if (event.keyCode === 13) {
        const newName = event.target.value;
      if (newName) {
        this.props.addNotification(this.state.username, newName);
        this.setState({username: newName});
      } else {
        this.setState({username: 'anonymous'});
      }
    }
  }

  onKeyEnterMsg(event) {
    if (event.keyCode === 13) {
      this.state.content = event.target.value;
      this.props.addMessage(this.state.username, this.state.content);
      this.setState({content: ''});
    }
  }
}

export default Chatbar;
