import React, {Component} from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    


   // line 22 {userA} changed their name to {userB}.
    return (
   
          <div className="message system">
            <span className="notification-content">{this.props.content}
            </span>
          </div>

    );
  }
}

export default Notification;

//`${this.state.currentUser.name} has changed to ${newUsername}`
