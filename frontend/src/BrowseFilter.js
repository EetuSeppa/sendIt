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
          <div class="p-6 shadow backdrop-blur-sm h-1/2 w-full sticky top-10">
              <form onSubmit={this.submitHandler}>
                    <button class="relative p-2 border-r-2 rounded border-b-2 float-left" onClick={this.props.close}>Back</button>
                    <button class="mr-10 border-b-2 rounded border-l-2 p-2 relative float-right" onClick={this.props.resetFilter}>Reset</button>
                    <h1 class="text-center">Filter</h1>
                    <br/>
                    <h2 class="pt-5">Grades:</h2>
                    {this.state.submitClicked? null : <GradeFilterSlider gradeHandler={this.gradeFromSlider}/>}
                    <h2 class="w-min p-2 rounded border-b-2 border-r-2 border-t-2">Sort: </h2>
                  <label class="">
                    Sort by:
                    <select class="mt-5" value={this.state.sortBy} onChange={this.sortByChange} >
                        <option value="Grade">Grade</option>
                        <option value="Alphabetical">Alphabetical</option>
                    </select>
                    </label>
                    <br/>
                  <label>
                    Order by:
                    <select class="mt-3" value={this.state.order} onChange={this.orderChange} >
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                    </label>
                    <br/>
                    <input class="border-2 p-2 rounded absolute bottom-5 right-10" type="submit" value="Apply"/>
              </form>
          </div>
      )
  }
}

export default BrowseFilter;