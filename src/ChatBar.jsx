import React, {Component} from 'react';

class Chatbar extends Component {

//-------------------- Lifecycle Methods

  constructor (props) {
    super(props);
    this.onKeyEnterMsg = this.onKeyEnterMsg.bind(this);
    this.onKeyEnterUsername = this.onKeyEnterUsername.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.onBlurUsername = this.onBlurUsername.bind(this);
    this.state = {
      currUsername : this.props.currUsername,
      username     : this.props.currUsername,
      content      : ''
    }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username'
               onBlur={this.onBlurUsername}
               onKeyDown={this.onKeyEnterUsername} value={this.state.username}
               onChange={this.onChangeUsername}
               placeholder='Your Name (Optional)'
               type='text'
               value={this.state.currUsername}
        />
        <input className='chatbar-message'
               onKeyDown={this.onKeyEnterMsg}
               onChange={this.onChangeMsg}
               placeholder='Type a message and hit ENTER'
               type='text'
               value={this.state.content}
        />
      </footer>
    );
  }

  //------------------- Synthetic Event Handlers

  onBlurUsername(event) {
    this.setState({currUsername: this.state.username})
  }

  onChangeMsg(event) {
    this.setState({content: event.target.value});
  }

  onChangeUsername(event) {
    this.setState({currUsername: event.target.value});
  }

  onKeyEnterMsg(event) {
    // Test message for an image link
    const imgURLregex = /(https?:\/\/.*\.(?:png|jpg))/i;
    const isAnImageLink = imgURLregex.test(event.target.value);
    if (event.keyCode === 13) {
      if (isAnImageLink) {
        this.props.addImage(this.state.username, this.state.content);
      } else {
        this.props.addMessage(this.state.username, this.state.content);
      }
      this.setState({content: ''});
    }
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
}

export default Chatbar;
