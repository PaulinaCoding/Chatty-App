import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import  MessageList  from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  //this.addTaskName = this.addTaskName.bind(this);///use this example for binding 
  //states - Like local variables
}

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store

    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}



render() {
  //calling different funcions

    // let taskItems;
    // if (this.state.loading === true) {
    //   taskItems = <Loading />;
    // } else {
    //   taskItems = this.state.tasks.map(task => (
    //     <TodoListItem key={task.id} task={task} />
    //   ));
    //   console.log(taskItems);
 

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

       
       
       <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
