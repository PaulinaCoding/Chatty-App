import React, {Component} from 'react';

class Chatbar extends Component {



/////////////////////////////////
  onEnterMessage = (event) => {
    if(event.key === 'Enter') {
      this.props.handleNewMessage(event.target.value);
        console.log('value', event.target.value)
      
        event.target.value = '';
    }
  };

  onEnterUser = (event) => {
    if(event.key === 'Enter') {
     this.props.handleNewUser(event.target.value);
        console.log('value', event.target.value)
      
        //event.target.value = '';
    }
  };
  

/////////////////////////////////////////////
  render() {
    
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onKeyPress={this.onEnterUser}
          //defaultValue={this.props.currentUser.name}
          placeholder="Your Name (Optional)"
        />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnterMessage}/>
      </footer>
    );
  }
}

export default Chatbar;
