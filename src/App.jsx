import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import  MessageList  from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.WebSocket = new WebSocket("ws://localhost:3001");

    this.state = {
      currentUser: {name: "Anonymous"},//{name: 'Bob'},
      messages: [] // messages coming from the server will be stored here as they arrive
    }
 
    this.handleNewUser = this.handleNewUser.bind(this); 
    //this.content = this.content.bind(this)
    //states - Like local variables
      
  } //constructor bracket ends;

  componentDidMount() {
  ///Create websocket
  
      // this.WebSocket.onopen = (event)  => {
      //  //this.WebSocket.send("Here's some text that the server is urgently awaiting!"); 
      //  console.log(event);
        this.WebSocket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log('message from server', message);
          
          //////////////////////////////////
          switch(message.type) {
            case "incomingMessage":
              // handle incoming message
              const messages = this.state.messages.concat(message)
              this.setState({messages: messages});

   /////////////////////////////////////////////////////
              break;
            case "incomingNotification":
            console.log(message);
              // const newNotification = this.state.messages.cont
              //const newNotification = this.state.messages.concat(message)
              const NewNotification = this.state.messages.concat(message)
              this.setState({messages: NewNotification});

              console.log("If this isn't showing, that's Problem #2");
              console.log("If this isn't old AND new names, that's Problem #3", message.oldName, message.newName);
              // handle incoming notification
              // TODO: the below code is wrong.  what's the right thing?
              // const sentNotification = this.state.sentNotification.concat(message)
              // this.setState({messages: sentNotification});
              break;
            default:
              // show an error in the console if the message type is unknown
              throw new Error("Unknown event type " + message.type);
          }
          ////////////////////////////////////

          // console.log(message)
          console.log("testing the random string")
        }
      // }
    }
    

  handleNewMessage = (content) => {

    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name, 
      content: content
    };
    // console.log(content)
    // console.log("Testing inside handleMessage", this.state.currentUser.name)

    this.WebSocket.send(JSON.stringify(newMessage));
    
  }

  ////////////////////////////////
  handleNewUser = (newUsername) => {
    const newUserMessage = {
      // TODO: needs more information, or different information
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed to ${newUsername}`
    
    };
    this.setState({currentUser: {name: newUsername}});
    this.WebSocket.send(JSON.stringify(newUserMessage));
  }

render() {
 
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      <MessageList messages={this.state.messages}/>
      <Chatbar handleNewUser={this.handleNewUser} handleNewMessage={this.handleNewMessage}/>
      </div>
    );
  }
}
export default App;
