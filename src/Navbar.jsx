import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
   
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className="usersNumber">{this.props.content}</div>
    </nav>

    );
  }
}

export default Navbar;

