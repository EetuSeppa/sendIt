import React from 'react';
import ViewHold from './ViewHold';
import getGradeFromIndex from './GradeFromIndex';
import ReviewRoute from './ReviewRoute';

class RouteView extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            reviewView: false,
            holdsToRender: null
        }

        this.routeCompleted = this.routeCompleted.bind(this);
    }

    loadHolds () {
        let holds = [];
        this.props.data.holds.forEach ((elem, index) => {
        holds.push(<ViewHold x={elem.x} y={elem.y}
                           h={elem.h} w={elem.w}
                           type={elem.type}
                           key={index}
                      />
                  );
        })
    
        return holds;
    }

    routeCompleted () {
        this.setState({reviewView: true});
    }

    componentDidMount () {
        this.setState({holdsToRender: this.loadHolds()});
    }



    render() {
        if (!this.state.reviewView) {
            return (
                <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
                <img class="block" src="https://27crags.s3.amazonaws.com/photos/000/170/170566/huge-36b290a1ec75.jpg"/>
                <svg class="p-6 max-w-sm mx-auto inset-0 absolute" width="400px" height="350">
                    {this.state.holdsToRender}
                </svg>
                <h2>{this.props.data.name}</h2>
                <h2>{getGradeFromIndex(this.props.data.grade)}</h2>
                <br/>
                <button onClick={this.props.close}>Back</button>
                <br/>
                <button onClick={this.routeCompleted}>Mark as sent</button>
                </div>
            );
        } else {
            return (
                <ReviewRoute routeName={this.props.data.name} 
                             username={this.props.username} 
                             routeInfo={this.props.data}
                />
            )
        }
    }

}
export default RouteView;