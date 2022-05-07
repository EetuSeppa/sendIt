import React from 'react';
import GradeFilterSlider from './GradeFilterSlider';

class BrowseFilter extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            gradeLow: 4,
            gradeHigh: 7,
            sortBy: "Grade",
            Order: "Ascending"
        }
    }

  render () {
      return (
          <div>
              <form>
                  <GradeFilterSlider />
              </form>
          </div>
      )
  }
}

export default BrowseFilter;