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
      if (this.state.page === "home") {
        view = (<Homepage handler={this.changeHandler}/>);
      } else if (this.state.page === "browse") {
        view = (<Browse/>);
      } else if (this.state.page === "history") {
        view = (<History />);
      } else if (this.state.page === "create") {
        view = (<Create />);
      } else if (this.state.page === "progress") {
        view = (<Progress />);
      }

      return view;

  }
}

export default App;
