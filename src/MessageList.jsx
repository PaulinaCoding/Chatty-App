import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages= this.props.messages;
    const listItems = messages.map((message)=> {
        if (message.type === 'incomingNotification') {
          return <Notification content={message.content}/>
        } else {
          return  <Message content={message.content} username={message.username}/> 
        }
    });

    return (
    <main className="messages">
     {listItems}
    </main>
    );
  }
}

export default MessageList;
