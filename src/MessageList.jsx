import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const messages= this.props.messages;
    const listItems = messages.map((message)=>
    <Message content={message.content} username={message.username}/>
   )


   // line 22 {userA} changed their name to {userB}.
    return (
    <main className="messages">
             {listItems}
          <div className="message system">
            <span className="notification-content">Anonymous1 changed their name to nomnom.</span>
          </div>
        </main>
    );
  }
}

export default MessageList;
