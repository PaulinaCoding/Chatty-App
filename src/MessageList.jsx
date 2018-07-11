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



    return (
    <main className="messages">
             {listItems}
  
             <div className="message system">
               Anonymous1 changed their name to nomnom.
             </div>
           </main>
     
    );
  }
}

export default MessageList;
