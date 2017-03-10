import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Notification extends Component {

//---------- Lifecycle Methods

  render() {
    return (
      <div className='message system'>
        <span style={{color: this.props.nameColor}}>{this.props.notification.oldName}</span>
        <span>&nbsp;changed their name to&nbsp;</span>
        <span style={{color: this.props.nameColor}}>{this.props.notification.newName}</span>
      </div>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this)
            .scrollIntoView({block: 'end', behavior: 'smooth'});
  }
}

export default Notification;