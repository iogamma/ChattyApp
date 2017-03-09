import React, {Component} from 'react';

class Notification extends Component {

  componentDidMount() {
    console.log("componentDidMount <Notification />");
  }

  render() {
    return (
      <div className="message system">
        {this.props.notification.oldName} changed their name to {this.props.notification.newName}
      </div>
    );
  }
}

export default Notification;