import React from 'react';
import Back from './Back';
import RouteView from './RouteView';
import BrowseFilter from './BrowseFilter';
import getGradeFromIndex from './GradeFromIndex'; 
import RouteOverview from './RouteOverview';

class Browse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			retrievedRoutes: null,
			routeView: null,
			filterView: false,
			unsortedRoutes: [],
			filterKey: 0
		}
		this.retrieveAllRoutes = this.retrieveAllRoutes.bind(this);
		this.changeToRouteView = this.changeToRouteView.bind(this);
		this.retrieveFilteredRoutes = this.retrieveFilteredRoutes.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.closeRouteView = this.closeRouteView.bind(this);
		this.closeFilter = this.closeFilter.bind(this);
	}

	changeToRouteView (route) {
		this.setState({routeView: route});
	}

	retrieveAllRoutes () {
		let xhr = new XMLHttpRequest();
    	xhr.open("GET", "http://localhost:8000/getRoutes", true);
    	xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if(xhr.response) {
					let responseObj = JSON.parse(xhr.response);
					this.setState({retrievedRoutes: responseObj});
				} else {
					this.setState({retrievedRoutes: []});
				}
			}
		}

    	xhr.send();
	}

	componentDidMount () {
		this.retrieveAllRoutes();
	}

	resetFilter () {
		let currentKey = this.state.filterKey;
		this.setState({filterKey: currentKey + 1});
	}

	closeFilter () {
		this.setState({filterView: false});
	}

	closeRouteView () {
		this.setState({routeView: null});
	}

	retrieveFilteredRoutes (filterData) {
		this.setState({
				filterView: false,
				retrievedRoutes: null
		});

		let xhr = new XMLHttpRequest();
    	xhr.open("POST", "http://localhost:8000/filterRoutes", true);
    	xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				let responseObj = JSON.parse(xhr.response);
				this.setState({unsortedRoutes: responseObj});

				if (filterData.sortBy == "Alphabetical") {
					this.state.unsortedRoutes.routes.sort((a, b) => {
						return (filterData.order == "Ascending"? 
												a.name.localeCompare(b.name):
												b.name.localeCompare(a.name))
					});
				} else if (filterData.sortBy == "Grade") {
					this.state.unsortedRoutes.routes.sort((a, b) => {
						return (filterData.order == "Ascending"? 
												a.grade - b.grade:
												b.grade - a.grade)
					});
				}
				this.setState({retrievedRoutes: Object.assign({}, this.state.unsortedRoutes)});
			}
		}

    	xhr.send(JSON.stringify(filterData));
	}

    render() {
		if (this.state.retrievedRoutes != null) {
			let routeList = [];
			this.state.retrievedRoutes.routes.forEach((element, i) => {
				routeList.push(
					<li class="flex shadow-xl rounded-xl bg-red-400 border-solid border-1" key={i} onClick={() => this.changeToRouteView(element)}> 
						<RouteOverview holds={element.holds}/>
						<div class="float-right">
							<h2>Name: {element.name}</h2>
							<h2>Grade: {getGradeFromIndex(element.grade)}</h2>
							<h2>Created by: {element.username}</h2>
						</div>
					</li>
				);
			});

				if (!this.state.routeView) {
					return (
					<div class="relative overflow-scroll h-screen pr-6 pl-6 max-w-sm mx-auto bg-red-300 rounded-xl">
	    				<Back handler={this.props.handler}/>
						{this.state.filterView? <BrowseFilter close={this.closeFilter} resetFilter={this.resetFilter} key={this.state.filterKey} handler={this.retrieveFilteredRoutes}/>: null}
						<ul class="mt-5 space-y-3">
							{routeList}
						</ul>
						<button class="shadow-xl p-2 bg-red-300 sticky bottom-5 float-right rounded-xl" onClick={()=>this.setState({filterView: true})}>Filter</button>
					</div>
					);
				} else {
					return (
					<RouteView close={this.closeRouteView} username={this.props.username} data={this.state.routeView} />
					);
				}
		} else {
			return (<h1>Loading routes...</h1>);
		}
    }
}

export default Browse;
