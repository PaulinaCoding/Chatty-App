import React, {Component} from 'react';

class Chatbar extends Component {
  


/////////////////////////////////
  onEnterMessage = (event) => {
    if(event.which === 13) {
    this.props.handleNewMessage(event.target.value);
      console.log('value', event.target.value)
    }
  }

/////////////////////////////////////////////
  render() {
    
    return (
      <footer className="chatbar">
        <input
        className="chatbar-username"
        defaultValue={this.props.currentUser.name}
        placeholder="Your Name (Optional)"
        />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnterMessage}/>
      </footer>
    );
  }
}

export default Chatbar;
