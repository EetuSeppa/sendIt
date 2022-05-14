import React from 'react';
import Hold from './Hold';
import InsertRouteInfo from './InsertRouteInfo';
import Back from './Back';

class Create extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        holdType: "Default",
        selectedHolds: new Map(),
        routeInformation: {},
        displayInfoInsert: false
      };
      this.changeHoldType = this.changeHoldType.bind(this);
      this.addHold = this.addHold.bind(this);
      this.doneButtonClicked = this.doneButtonClicked.bind(this);
      this.submitRoute = this.submitRoute.bind(this);
      this.closeInformationInsert = this.closeInformationInsert.bind(this);
  }

  submitRoute (userInput) {
    userInput.holds = [];
    this.state.selectedHolds.forEach((value, key) => {
      userInput.holds.push(value);
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/saveRoute", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userInput));

    //Add error handling based on status code
  }

  loadHolds () {
    const obj = require('./Wall.json');
    let holds = [];
    obj.Wall.Holds.forEach ((elem, index) => {
      holds.push(<Hold x={elem.x} y={elem.y}
                       h={elem.h} w={elem.w}
                       type={this.state.holdType}
                       handler={this.addHold}
                       id={index}
                       key={index}
                  />
                );
    })

    return holds;
  }

  closeInformationInsert () {
    this.setState({displayInfoInsert: false});
  }

  addHold (holdX, holdY, holdHeight, holdWidth, holdId) {
    let previouslyAdded = this.state.selectedHolds.get(holdId);
    if (previouslyAdded != undefined) {
      if (this.state.holdType == previouslyAdded.type) {
        //Delete hold if the hold has been previously clicked with same type
        this.state.selectedHolds.delete(holdId);
        return;
      }
    }
    let obj = {
      x: holdX,
      y: holdY,
      h: holdHeight,
      w: holdWidth,
      type: this.state.holdType
    };
    this.state.selectedHolds.set(holdId, obj);
  }

  changeHoldType (type) {
    if (type == this.state.holdType) { //If same button pressed twice
      this.setState({holdType: "Default"});
    } else {
      this.setState({holdType: type});
    }
  }

  doneButtonClicked () {
    const holds = this.state.selectedHolds.values();
    this.setState({displayInfoInsert: true});
  }

  render() {
    let holdsToRender = this.loadHolds();
    return (
      <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
        <img class="block" src="https://27crags.s3.amazonaws.com/photos/000/170/170566/huge-36b290a1ec75.jpg"/>
        <svg class="p-6 max-w-sm mx-auto inset-0 absolute" width="400px" height="350">
          {holdsToRender}
        </svg>
        <div class="space-x-5">
          <button onClick={() => this.changeHoldType("Start")}>Start</button>
          <button onClick={() => this.changeHoldType("Top")}>Top</button>
          <button onClick={() => this.changeHoldType("Feet")}>Feet</button>
          <button onClick={this.doneButtonClicked}>Done</button>
	    	  <Back handler={this.props.handler}/>
        </div>
        {this.state.displayInfoInsert? <InsertRouteInfo close={this.closeInformationInsert} handler={this.submitRoute}/> : null}
      </div>
    );
  }
}

export default Create;