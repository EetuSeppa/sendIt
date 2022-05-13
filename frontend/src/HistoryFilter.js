import React from 'react';
import GradeFilterSlider from './GradeFilterSlider';

class HistoryFilter extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      gradeLow: null,
      gradeHigh: null,
      dateLow: null,
      dateHigh: null
    }
    
    this.gradeFromSlider = this.gradeFromSlider.bind(this);

    this.lowDateChangeHandler = this.lowDateChangeHandler.bind(this);
    this.highDateChangeHandler = this.highDateChangeHandler.bind(this);
  }

  gradeFromSlider (lowGrade, highGrade) {
    this.setState({
        gradeLow: lowGrade,
        gradeHigh: highGrade
    })
}

  lowDateChangeHandler (event) {
    this.setState({dateLow: event.target.value});
  }

  highDateChangeHandler (event) {
    this.setState({dateHigh: event.target.value});
  }

  render () {
      return (
          <div>
              <form onSubmit={this.submitHandler}>
                    <GradeFilterSlider gradeHandler={this.gradeFromSlider}/>
                  <label>
                    Number of tries:
                    <input type="range" min="1" max="11"/>
                    </label>
                    <br/>
                  <label>
                    Date:
                    <input onChange={this.lowDateChangeHandler} type="date" id="start"/>
                    -
                    <input onChange={this.highDateChangeHandler} type="date" id="end"/>
                    <br/>
                  </label>
                  <input type="submit" value="Apply filter"/>
              </form>
          </div>
      );
  }

}

export default HistoryFilter;