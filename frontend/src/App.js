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
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {page: "home"};
  }

  changeHandler (text) {
    console.log(text);
    this.setState({page: text})  
  }

  render() {
      let view;
      switch(this.state.page) {

      case "home":
          view = (<Homepage handler={this.changeHandler}/>);
	  break;

      case "browse":
          view = (<Browse/>);
	  break;

      case "history":
          view = (<History />);
	  break;

      case "create":
          view = (<Create />);
	  break;

      case "progress":
          view = (<Progress />);
	  break;
      }

      return view;
  }
}

export default App;
