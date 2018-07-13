import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import  MessageList  from './MessageList.jsx';
import  Navbar  from './Navbar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.WebSocket = new WebSocket("ws://localhost:3001");

    this.state = {
      usersNumber: 0,
      currentUser: {name: "Anonymous"},
      messages: [] // messages coming from the server will be stored here as they arrive
    }
 
    this.handleNewUser = this.handleNewUser.bind(this); 
    
      
  }; //constructor bracket ends;

  componentDidMount() {
  ///Create websocket
  
    this.WebSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('message from server', message);
    
      switch(message.type) {
        case "incomingMessage":
          // handle incoming message
          const messages = this.state.messages.concat(message)
          this.setState({messages: messages});

          break;
        case "incomingNotification":
          const NewNotification = this.state.messages.concat(message)
          this.setState({messages: NewNotification});
        
          break;
          case "usersNumber":
          this.handleUsersNumber(message.count)
          
          break;
          default:
          
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + message.type);
      }
    }
  };

  handleNewMessage = (content) => {

    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name, 
      content: content
    };

    this.WebSocket.send(JSON.stringify(newMessage));
  };


  handleNewUser = (newUsername) => {
    const newUserMessage = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed to ${newUsername}`
    
    }
    this.setState({currentUser: {name: newUsername}});
    this.WebSocket.send(JSON.stringify(newUserMessage));
  };


  handleUsersNumber = (usersNumber) => {
    const usersNumberDisplay = {
      content: `Number of active users: ${usersNumber}`
    }
    this.setState({usersNumber: usersNumberDisplay});
    
  };


  render() {
      return (
        <div>
          <Navbar content={this.state.usersNumber.content} />
            <MessageList messages={this.state.messages}/>
            <Chatbar handleNewUser={this.handleNewUser} handleNewMessage={this.handleNewMessage}/>
        </div>
      )
  }

};

export default App;
