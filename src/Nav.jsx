import React, {Component} from 'react';

class Nav extends Component {

  componentDidMount() {
    console.log('componentDidMount <Nav />');
  }

  render() {
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
        <span className="navbar-user-count">Users Online: {this.props.numOfUsers}</span>
      </nav>
    );
  }
}

export default Nav;

