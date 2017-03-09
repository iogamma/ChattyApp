import React, {Component} from 'react';

class Notification extends Component {

  componentDidMount() {
    console.log("componentDidMount <Notification />");
  }

  render() {
    return (
      <div className="message system">
        <span style={{color: this.props.nameColor}}>
          {this.props.notification.oldName}
        </span>
        <span>&nbsp;changed their name to&nbsp;</span>
        <span style={{color: this.props.nameColor}}>
          {this.props.notification.newName}
        </span>
      </div>
    );
  }
}

export default Notification;