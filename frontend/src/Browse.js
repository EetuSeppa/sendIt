import React from 'react';
import Back from './Back';
import RouteView from './RouteView';
import BrowseFilter from './BrowseFilter';
import getGradeFromIndex from './GradeFromIndex'; 

class Browse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			retrievedRoutes: null,
			routeView: null,
			filterView: false,
			unsortedRoutes: []
		}
		this.retrieveAllRoutes = this.retrieveAllRoutes.bind(this);
		this.changeToRouteView = this.changeToRouteView.bind(this);
		this.retrieveFilteredRoutes = this.retrieveFilteredRoutes.bind(this);
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
				let responseObj = JSON.parse(xhr.response);
				this.setState({retrievedRoutes: responseObj});
			}
		}

    	xhr.send();
	}

	componentDidMount () {
		this.retrieveAllRoutes();
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
					<li key={i} onClick={() => this.changeToRouteView(element)}> 
						<h2>Name: {element.name}</h2>
						<h2>Grade: {getGradeFromIndex(element.grade)}</h2>
					</li>
				);
			});

				if (!this.state.routeView) {
					return (
					<div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
	    				<Back handler={this.props.handler}/>
						<ul>
							{routeList}
						</ul>
						<br/>
						<button onClick={()=>this.setState({filterView: true})}>Filter</button>
						{this.state.filterView? <BrowseFilter handler={this.retrieveFilteredRoutes}/>: null}
					</div>
					);
				} else {
					return (
					<RouteView username={this.props.username} data={this.state.routeView} />
					);
				}
		} else {
			return (<h1>Loading routes...</h1>);
		}
    }
}

export default Browse;
