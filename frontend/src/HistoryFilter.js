import React from 'react';
import GradeFilterSlider from './GradeFilterSlider';

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
    this.attemptsChangeHandler = this.attemptsChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
    }

  attemptsChangeHandler(event) {
    this.setState({attempts: event.target.value});
  }

  render () {
      return (
          <div>
              <form onSubmit={this.submitHandler}>
                    <button onClick={this.props.close}>Back</button>
                    <br/>
                    <button onClick={this.props.resetFilter}>Reset filters</button>
                    <GradeFilterSlider resetFilter={this.props.resetFilter} gradeHandler={this.gradeFromSlider}/>
                  <label>
                    Number of tries:
                    <input onChange={this.attemptsChangeHandler} type="range" min="1" max="11"/>
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