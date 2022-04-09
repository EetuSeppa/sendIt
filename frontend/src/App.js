import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Browse from './Browse';
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
      if (this.state.page === "home") {
        return (<Homepage handler={this.changeHandler}/>);
      } else if (this.state.page === "browse") {
        return (<Browse/>);
      }

  }
}

export default App;
