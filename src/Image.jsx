import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Image extends Component {

//---------- Lifecycle Methods

  render() {
    return (
      <div className='message'>
        <span className='message-username' style={{color: this.props.nameColor}}>{this.props.username}</span>
        <span className='message-content'><img className='image' src={this.props.imageURL} /></span>
      </div>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this)
            .scrollIntoView({block: 'end', behavior: 'smooth'});
  }
}

export default Image;
