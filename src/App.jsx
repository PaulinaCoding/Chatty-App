import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import  MessageList  from './MessageList.jsx';


class App extends Component {
    constructor(props) {
        super(props);
        this.WebSocket = new WebSocket("ws://localhost:3001");

        this.state = {
            currentUser: {username: "Anonymous"},//{name: 'Bob'},
            messages: [] // messages coming from the server will be stored here as they arrive
        }
 
  this.handleNewUser = this.handleNewUser.bind(this); 
  //this.content = this.content.bind(this)
  //states - Like local variables
    
    } //constructor bracket ends;

  componentDidMount() {
  ///Create websocket
  
      this.WebSocket.onopen = (event)  => {
       //this.WebSocket.send("Here's some text that the server is urgently awaiting!"); 
       console.log(event);
        this.WebSocket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log(message)
          console.log("testing the random string")
        }
      }
    }
    

handleNewMessage = (content) => {

  const newMessage = {
      username: this.state.currentUser.username, 
      content: content
  };
  console.log(content)
  console.log("Testing inside handleMessage", this.state.currentUser.username)

  const messages = this.state.messages.concat(newMessage)
  this.setState({messages: messages});
  this.WebSocket.send(JSON.stringify(newMessage));
  
}
////////////////////////////////
handleNewUser = (username) => {
    const newUser = {
    username: this.state.currentUser.username
    
    }

  console.log(this.state.currentUser.username)

 
  this.setState({currentUser: {username:username}});
  this.WebSocket.send(JSON.stringify(newUser));
  
  console.log('user', username);
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
