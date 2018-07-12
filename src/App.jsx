import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import  MessageList  from './MessageList.jsx';



class App extends Component {
    constructor(props) {
        super(props);
        this.WebSocket = new WebSocket("ws://localhost:3001");

        this.state = {
            currentUser: {name: 'Bob'},//{name: this.handleNewUser},
            messages: [] // messages coming from the server will be stored here as they arrive
        }
    //   currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
    //   messages: [
    //     {
    //       username: 'Bob',
    //       content: 'Has anyone seen my marbles?',
    //     },
    //     {
    //       username: 'Anonymous',
    //       content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    //     }
    //   ]
    // }
  this.handleNewUser = this.handleNewUser.bind(this);///use this example for binding 
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
        }
      }
    }
    


///////////////////////////////////
handleNewMessage = (content) => {

  const newMessage = {
      username: this.state.currentUser.name, 
      content: content
  };
  console.log(content)
  const messages = this.state.messages.concat(newMessage)
  this.setState({messages: messages});
  this.WebSocket.send(JSON.stringify(newMessage));
  
}
////////////////////////////////
handleNewUser = (username) => {
  const newUser = {
   username: this.state.currentUser.name
  }

  console.log(this.state.currentUser.name)

 
  this.setState({currentUser: username});
  this.WebSocket.send(JSON.stringify({currentUser: username}));
 console.log('user', name);
}


//////////////////////////////////////

render() {
 
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      <MessageList messages={this.state.messages}/>
      <Chatbar currentUser={this.handleNewUser} handleNewMessage={this.handleNewMessage}/>
      </div>
    );
  }
}
export default App;
