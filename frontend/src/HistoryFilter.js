import React from 'react';
import GradeFilterSlider from './GradeFilterSlider';
import AttemptsSlider from './AttemptsSlider'

class HistoryFilter extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      gradeLow: null,
      gradeHigh: null,
      dateLow: null,
      dateHigh: null,
      attempts: null
    }
    
    this.gradeFromSlider = this.gradeFromSlider.bind(this);

    this.lowDateChangeHandler = this.lowDateChangeHandler.bind(this);
    this.highDateChangeHandler = this.highDateChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.attemptsFromSlider = this.attemptsFromSlider.bind(this);
  }

  gradeFromSlider (lowGrade, highGrade) {
    this.setState({
        gradeLow: lowGrade,
        gradeHigh: highGrade
    })
}

attemptsFromSlider (value) {
  this.setState({attempts: value});
}

  lowDateChangeHandler (event) {
    this.setState({dateLow: event.target.value});
  }

  highDateChangeHandler (event) {
    this.setState({dateHigh: event.target.value});
  }

  submitHandler (event) {
    event.preventDefault();
    let filterData = {
        dateLow: this.state.dateLow,
        dateHigh: this.state.dateHigh,
        gradeLow: this.state.gradeLow,
        gradeHigh: this.state.gradeHigh,
        attempts: this.state.attempts
      } 

      this.props.handler(filterData);
    this.props.close();
  }


  render () {
      return (
          <div class="p-6 shadow backdrop-blur-sm h-1/2 w-full sticky top-10">
              <form onSubmit={this.submitHandler}>
                    <button class="relative p-2 border-r-2 rounded border-b-2 float-left" onClick={this.props.close}>Back</button>
                    <button class="mr-5 border-b-2 rounded border-l-2 p-2 relative float-right" onClick={this.props.resetFilter}>Reset filters</button>
                    <br/>
                    <br/>
                    <h2 class="mt-3">Grade</h2>
                    <GradeFilterSlider resetFilter={this.props.resetFilter} gradeHandler={this.gradeFromSlider}/>
                  <label>
                    <h2 class="mt-3">Number of tries:</h2>
                    <AttemptsSlider passValues={this.attemptsFromSlider}/>
                    </label>
                    <br/>
                  <label>
                    Date:
                    <br/>
                    <div class="flex">
                      <input class="display:inline" onChange={this.lowDateChangeHandler} type="date" id="start"/>
                      <h2 class="p-1">-</h2>
                      <input class="display:inline" onChange={this.highDateChangeHandler} type="date" id="end"/>
                    </div>
                  </label>
                  <input class="border-2 p-2 rounded absolute bottom-5 right-10"  type="submit" value="Apply filter"/>
              </form>
          </div>
      );
  }

}

export default HistoryFilter;