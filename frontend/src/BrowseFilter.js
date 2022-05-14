import React from 'react';
import GradeFilterSlider from './GradeFilterSlider';

class BrowseFilter extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            gradeLow: null,
            gradeHigh: null,
            submitClicked: false,
            sortBy: "Alphabetical",
            order: "Ascending"
        }
        this.gradeFromSlider = this.gradeFromSlider.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.sortByChange = this.sortByChange.bind(this);
        this.orderChange = this.orderChange.bind(this);
    }

    gradeFromSlider (lowGrade, highGrade) {
        this.setState({
            gradeLow: lowGrade,
            gradeHigh: highGrade
        })
    }

    submitHandler (event) {
        event.preventDefault();
        this.setState({submitClicked: true});
        let filterData = {
            sortBy: this.state.sortBy,
            order: this.state.order,
            gradeLow: this.state.gradeLow,
            gradeHigh: this.state.gradeHigh 
        } 

        this.props.handler(filterData);
    }

    sortByChange (event) {
        this.setState({sortBy: event.target.value});
    }

    orderChange (event) {
        this.setState({order: event.target.value});
    }
    

  render () {
      return (
          <div>
              <form onSubmit={this.submitHandler}>
                    <button onClick={this.props.close}>Back</button>
                    <br/>
                    <button onClick={this.props.resetFilter}>Reset</button>
                    {this.state.submitClicked? null : <GradeFilterSlider gradeHandler={this.gradeFromSlider}/>}
                  <label>
                    Sort by:
                    <select value={this.state.sortBy} onChange={this.sortByChange} >
                        <option value="Grade">Grade</option>
                        <option value="Alphabetical">Alphabetical</option>
                    </select>
                    </label>
                    <br/>
                  <label>
                    Order by:
                    <select value={this.state.order} onChange={this.orderChange} >
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                    </label>
                    <br/>
                    <input type="submit" value="Apply filter"/>
              </form>
          </div>
      )
  }
}

export default BrowseFilter;