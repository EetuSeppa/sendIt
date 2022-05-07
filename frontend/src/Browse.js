import React from 'react';
import Back from './Back';
import RouteView from './RouteView';
import BrowseFilter from './BrowseFilter';

class Browse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			retrievedRoutes: null,
			routeView: null,
			filterView: false
		}
		this.retrieveAllRoutes = this.retrieveAllRoutes.bind(this);
		this.changeToRouteView = this.changeToRouteView.bind(this);
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

    render() {
		if (this.state.retrievedRoutes != null) {
			let routeList = [];
			this.state.retrievedRoutes.routes.forEach((element, i) => {
				routeList.push(
					<li key={i} onClick={() => this.changeToRouteView(element)}> 
						<h2>Name: {element.name}</h2>
						<h2>Grade: {element.grade}</h2>
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
						{this.state.filterView? <BrowseFilter />: null}
					</div>
					);
				} else {
					return (
					<RouteView data={this.state.routeView} />
					);
				}
		} else {
			return (<h1>Loading routes...</h1>);
		}
    }
}

export default Browse;
