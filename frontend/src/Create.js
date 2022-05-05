import React from 'react';
import Hold from './Hold';
import HoldTypeButton from './HoldTypeButton';

class Create extends React.Component {
  constructor(props) {
      super(props);
      this.state = {holdType: "Default"};
      this.changeHoldType = this.changeHoldType.bind(this);
  }

  loadHolds () {
    const obj = require('./Wall.json');
    let holds = [];
    obj.Wall.Holds.forEach (elem => {
      holds.push(<Hold x={elem.x} y={elem.y}
                       h={elem.h} w={elem.w}/>
                );
    })

    return holds;
  }

  changeHoldType (type) {
    console.log(this.state.holdType);
    this.setState = {holdType: type};
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
          <HoldTypeButton handler={this.changeHoldType} type="Start"/>
          <HoldTypeButton handler={this.changeHoldType} type="Top"/>
          <HoldTypeButton handler={this.changeHoldType} type="Feet"/>
          <button>Done</button>
        </div>
      </div>
    );
  }
}

export default Create;