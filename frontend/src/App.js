import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Browse from './Browse';
import History from './History';
import Progress from './Progress';
import Create from './Create';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "username",
      username: null,
      routesClimbedByUser: null
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.usernameHandler = this.usernameHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler (text) {
    console.log(text);
    this.setState({page: text})  
  }

  usernameHandler (event) {
    this.setState({username: event.target.value});
  }

  submitHandler (event) {
    event.preventDefault();
    this.setState({page: "home"});

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/addUser", true);
    xhr.setRequestHeader("Content-Type", "application/json");


    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {

        };
    };
    xhr.send(JSON.stringify({
        username: this.state.username,
        }
    ));
  }

  render() {
      let view;
      switch(this.state.page) {
      case "username":
          view = (
            <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
              <form onSubmit={this.submitHandler}>
                <label>
                  Enter username:
                  <input type="text" value={this.state.username} onChange={this.usernameHandler}/>
                </label>
                <input type="submit" value="Continue"/>
              </form>
            </div>
          )
          break;

      case "home":
          view = (<Homepage  handler={this.changeHandler}/>);
	  break;

      case "browse":
          view = (<Browse username={this.state.username} handler={this.changeHandler}/>);
	  break;

      case "history":
          view = (<History username={this.state.username} handler={this.changeHandler}/>);
	  break;

      case "create":
          view = (<Create username={this.state.username} handler={this.changeHandler}/>);
	  break;

      case "progress":
          view = (<Progress username={this.state.username} handler={this.changeHandler}/>);
	  break;
      }

      return view;
  }
}

export default App;
