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
    // }

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
