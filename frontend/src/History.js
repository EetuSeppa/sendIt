import React from 'react';
import HistoryFilter from './HistoryFilter';
import getGradeFromIndex from './GradeFromIndex';
import RouteView from './RouteView';

class History extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      retrievedRoutes: null,
      routeList: null,
      routeView: null
    }
  }

  componentDidMount () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/getClimbedRoutes", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
          console.log(xhr.response);
				  let responseObj = JSON.parse(xhr.response);
				  this.setState({retrievedRoutes: responseObj});
          let tempRouteList = [];

          this.state.retrievedRoutes.routes.forEach((element, index) => {
            tempRouteList.push(
              <li key={index} onClick={() => this.changeToRouteView(element)}>
                Name: {element.name}
                Grade: {getGradeFromIndex(element.grade)}
                Attempts: {element.numOfAttempts}
              </li>
            );
          });
          this.setState({routeList: tempRouteList});
        };
    };
    xhr.send(JSON.stringify({
        username: this.props.username,
        }
    ));
  }

	changeToRouteView (route) {
		this.setState({routeView: route});
	}


  render() {
    if (!this.state.routeView) {
      return (
        <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
						<ul>
							{this.state.routeList}
						</ul>
						<br/>
						<button onClick={()=>this.setState({filterView: true})}>Filter</button>
						{this.state.filterView? <HistoryFilter handler={this.retrieveFilteredRoutes}/>: null}
					</div>
      );
    } else {
      return (
					<RouteView username={this.props.username} data={this.state.routeView} />
      );
    }
  }
}

export default History;