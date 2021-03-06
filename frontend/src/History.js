import React from 'react';
import HistoryFilter from './HistoryFilter';
import getGradeFromIndex from './GradeFromIndex';
import RouteView from './RouteView';
import Back from './Back';
import RouteOverview from './RouteOverview';

class History extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      retrievedRoutes: null,
      filteredRoutes: null,
      routeList: null,
      routeView: null,
			filterKey: 0,
      filterView: false
    }
    this.compareDates = this.compareDates.bind(this);
    this.filterRoutes = this.filterRoutes.bind(this);
    this.updateDisplayedRoutes = this.updateDisplayedRoutes.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
    this.closeRouteView = this.closeRouteView.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
  }

  componentDidMount () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/getClimbedRoutes", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
          if (xhr.response) {
				    let responseObj = JSON.parse(xhr.response);
				    this.setState({retrievedRoutes: responseObj});
            this.updateDisplayedRoutes(this.state.retrievedRoutes.routes);
          } else {
            this.setState({routeList: null});
          }
    };
    }
    xhr.send(JSON.stringify({
        username: this.props.username,
        }
    ));
  }

  resetFilter () {
		let currentKey = this.state.filterKey;
		this.setState({filterKey: currentKey + 1});
  }

  closeFilter() {
    this.setState({filterView: false});
  }

  updateDisplayedRoutes (routes) {
    let tempRouteList = [];

          routes.forEach((element, index) => {
            //Parse date string to year, month and day
            let splitDate = element.dateCompleted.split(/\D+/);
            let year = splitDate[0];
            let month = splitDate[1];
            let day = splitDate[2];

        tempRouteList.push(
          <li class="mb-5 flex shadow-xl rounded-xl bg-red-400 border-solid border-1" 
              key={index} onClick={() => this.changeToRouteView(element)}
            >
            <RouteOverview holds={element.holds}/>
            <div class="float-left mr-6">
              <h2 class="display-block">Name: {element.name}</h2>
              <h2 class="display-block">Grade: {getGradeFromIndex(element.grade)}</h2>
            </div>
            <div class="float-right pr-5">
              <h2 class="display-block">Attempts: {element.numOfAttempts}</h2>
              <h2 class="display-block">Date: {day + "-" + month + "-" + year}</h2>
            </div>
          </li>
        );
      });
      this.setState({routeList: tempRouteList});
  };


  filterRoutes (info) {
    let tempRouteList = [];

    this.state.retrievedRoutes.routes.forEach((element, index) => {
      if (this.compareDates(element, info) &&
        info.gradeLow <= element.grade &&
        info.gradeHigh >= element.grade
      ) {
        if (info.attempts && info.attempts == element.numOfAttempts) {
          tempRouteList.push(element);
        } else if (!info.attempts) {
          tempRouteList.push(element);
        }
      }
    });
    this.updateDisplayedRoutes(tempRouteList);
  }

  compareDates (route, filter) {
    let routeDate = new Date(route.dateCompleted);
    let highDate = new Date(filter.dateHigh);
    let lowDate = new Date(filter.dateLow);

    return (routeDate <= highDate && routeDate >= lowDate);
  }

	changeToRouteView (route) {
		this.setState({routeView: route});
	}

  closeRouteView () {
    this.setState({routeView: null});
  }


  render() {
    if (!this.state.routeView && this.state.routeList) {
      return (
        <div class="relative overflow-scroll h-screen pr-6 pl-6 max-w-sm mx-auto bg-red-300 rounded-xl">
	    			<Back handler={this.props.handler}/>
						{this.state.filterView? <HistoryFilter close={this.closeFilter} key={this.state.filterKey} resetFilter={this.resetFilter} handler={this.filterRoutes}/>: null}
						<ul>
							{this.state.routeList}
						</ul>
						<br/>
						<button class="shadow-xl p-2 bg-red-300 sticky bottom-5 float-right rounded-xl" onClick={()=>this.setState({filterView: true})}>Filter</button>
					</div>
      );
    } else if (!this.state.routeList) {
      return (
        <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
	    		<Back handler={this.props.handler}/>
          <h2>You haven't marked any routes as climbed.
            Maybe try finding something to climb by using the browse feature?
          </h2>
        </div>
      )
    } else {
      return (
					<RouteView completed={true} close={this.closeRouteView} username={this.props.username} data={this.state.routeView} />
      );
    }
  }
}

export default History;