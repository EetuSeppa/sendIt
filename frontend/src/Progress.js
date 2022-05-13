import React from 'react';
import getGradeFromIndex from './GradeFromIndex';

class Progress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      retrievedRoutes: null,
      diagramBarValues: [],
      maxBar: null,
      minBar: null,
      maxValue: 0,
      sideLines: null,
      sideNumbers: null,
      bars: null,
      bottomGrades: null,
      svgWidth: 600
    }
    this.calculateBarValues = this.calculateBarValues.bind(this);
  }

  calculateBarValues (arr) {
    let barValues = new Array(13).fill(0);
    arr.forEach((elem, index) => {
      let barIndex = Math.floor(elem.grade / 2);
      barValues[barIndex] += 1;
    });

    let i;
    this.setState({maxValue: Math.max(...barValues)});
    for (let i = 12; i >= 0; --i) {
      if (barValues[i] > 0) {
        this.setState({maxBar: i});
        break;
      }
    }

    for (let i = 0; i < 13; ++i) {
      if (barValues[i] > 0) {
        this.setState({minBar: i});
        break;
      }
    }
    this.setState({diagramBarValues: barValues});
  }

  renderSideLines () {
    let sideLines = [];
    const leftStart = 10;
    let currentLine = 20;
    for (let i = 0; i <= this.state.maxValue; ++i) {
      sideLines.push(
        <line x1={leftStart + 9} y1={currentLine - 5} 
            x2={leftStart + 20} y2={currentLine - 5} stroke="black"/>
      );
      currentLine += (580 / this.state.maxValue);
    } 
    this.setState({sideLines: sideLines});
  }

  renderSideNumbers () {
    let sideNumbers = [];
    const leftStart = 10;
    let currentLine = 20;
    let currentValue = this.state.maxValue;
    for (let i = 0; i <= this.state.maxValue; ++i) {
      sideNumbers.push(
        <text x={leftStart} y={currentLine} class="small">{currentValue}</text>
      );
      currentLine += (580 / this.state.maxValue);
      currentValue = currentValue - 1;
    } 

    this.setState({sideNumbers: sideNumbers});
  }

  renderBars () {
    let barArr = [];
    let bottomGradesArr = [];
    let bottom
    let barCount = this.state.maxBar - this.state.minBar;  
    let currentXPosition = 40;
    let height;
    let index = this.state.minBar;

    for (let i = 0; i <= barCount; ++i) {
      height = this.state.diagramBarValues[index] * (Math.floor(580 / this.state.maxValue));
      console.log(currentXPosition);
      barArr.push (
        <rect fill="red" width={50} x={currentXPosition} 
          y={10 + (580 - height)} 
          height={height}
        />
      )
        let textToDisplay = getGradeFromIndex(index*2) + '/' + getGradeFromIndex((index*2) + 1);

      bottomGradesArr.push(
        <text x={currentXPosition + 5} y={580} textLength="40">
          {textToDisplay}
        </text>
      )

      currentXPosition += Math.floor(500 / barCount);

      //Extend svg width if needed
      if (currentXPosition > this.state.svgWidth) {
        let newWidth = this.state.svgWidth + (Math.floor(500 / barCount) + 10);
        this.setState({svgWidth: newWidth});
      }
      ++index;
    }
    this.setState({bars: barArr});
    this.setState({bottomGrades: bottomGradesArr});
  }

  componentDidMount () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/getClimbedRoutes", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
				  let responseObj = JSON.parse(xhr.response);
				  this.setState({retrievedRoutes: responseObj.routes});
          this.calculateBarValues(this.state.retrievedRoutes);
          this.renderSideNumbers();
          this.renderSideLines();
          this.renderBars();
        };
    };
    xhr.send(JSON.stringify({
        username: this.props.username,
        }
    ));
  }

render() {
      return (
        <div class="overflow-x-auto p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
          <svg width={this.state.svgWidth} height="600">
            {this.state.sideLines}
            {this.state.sideNumbers}
            {this.state.bars}
            {this.state.bottomGrades}
          </svg>
        </div>
      )
  }
}

export default Progress;