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

  isHoldVisible (x, y, type) {
    if (this.props.selectedHolds) {
      let found = this.props.selectedHolds.find(elem => elem.x === x && elem.y === y);
      if (found) {
        return (found)
      }
    }
    return null;
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
                       visible={this.isHoldVisible(elem.x, elem.y)}
                  />
                );
    })

    return holds;
  }

  closeInformationInsert () {
    this.setState({displayInfoInsert: false});
  }

  addHold (holdX, holdY, holdHeight, holdWidth, holdId, holdType) {
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
      //Use holdtype from argument if not null
      type: (holdType? holdType: this.state.holdType)
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
        <button onClick={this.props.close}>Back</button>
        <img class="block" src="/board.jpg"/>
        <svg class="block max-w-sm mx-auto left-25 top-12 absolute" 
          width="700" height="500">
          {holdsToRender}
        </svg>
        <div class="mt-5 space-x-2 border-2 rounded p-3 border-rose-200">
          <button class={(this.state.holdType==="Start"? "border-black bg-slate-500 ": "border-rose-200 " ) + "p-2 rounded-xl border-2"} onClick={() => this.changeHoldType("Start")}>Start</button>
          <button class={(this.state.holdType==="Top"? "border-black bg-slate-500 ": "border-rose-200 " ) + "p-2 rounded-xl border-2"} onClick={() => this.changeHoldType("Top")}>Top</button>
          <button class={(this.state.holdType==="Feet"? "border-black bg-slate-500 ": "border-rose-200 " ) + "p-2 rounded-xl border-2"} onClick={() => this.changeHoldType("Feet")}>Feet</button>
          <button class="border-rose-200 float-right p-2 rounded-xl border-2" onClick={this.doneButtonClicked}>Done</button>
        </div>
        {this.state.displayInfoInsert? <InsertRouteInfo username={this.props.username} routeCreated={()=>this.props.close()} close={this.closeInformationInsert} handler={this.submitRoute}/> : null}
      </div>
    );
  }
}

export default Create;