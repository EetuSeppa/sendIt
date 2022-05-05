import React from 'react';

class HoldTypeButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {clicked: false};
      this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler () {
    console.log(this.state.clicked);
    let currentState = this.state.clicked;
    this.setState({clicked: !currentState});

    if (currentState == true)
        this.props.handler(null);
    else
        this.props.handler(this.props.type);

  }

  render () {
      return (
        <button onClick={this.clickHandler} >{this.props.type}</button>
      );
  }


}

export default HoldTypeButton;