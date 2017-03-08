import React, {Component} from 'react';

class Chatbar extends Component {

  constructor (props) {
    super(props);
    this.onKeyEnterMsg = this.onKeyEnterMsg.bind(this);
    this.onBlurUsername = this.onBlurUsername.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.state = {
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
               defaultValue={this.state.username}
               onBlur={this.onBlurUsername} value={this.state.username}
               onChange={this.onChangeUsername}
               type='text'
               value={this.state.username}
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

  onChangeMsg(event) {
    this.setState({content: event.target.value});
  }

  onChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  onBlurUsername(event) {
    const newName = event.target.value;
    if (newName) {
      this.state.username =  newName;
    } else {
        this.setState({username: 'anonymous'});
    }
  }

  onKeyEnterMsg(event) {
    if (event.keyCode === 13) {
      this.state.content = event.target.value;
      this.props.addMessageToList(this.state.username, this.state.content);
      this.setState({content: ''});
    }
  }
}

export default Chatbar;
