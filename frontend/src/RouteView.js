import React from 'react';
import ViewHold from './ViewHold';
import getGradeFromIndex from './GradeFromIndex';
import ReviewRoute from './ReviewRoute';
import Create from './Create';

class RouteView extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            reviewView: false,
            holdsToRender: null,
            editView: false
        }

        this.routeCompleted = this.routeCompleted.bind(this);
        this.closeReview = this.closeReview.bind(this);
        this.openEditView = this.openEditView.bind(this);
        this.closeEditView =this.closeEditView.bind(this);
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

    closeReview () {
        this.setState({reviewView: false});
    }

    openEditView () {
        this.setState({editView: true});
    }

    closeEditView () {
        this.setState({editView: false});
    }



    render() {
        if (!this.state.reviewView && !this.state.editView) {
            return (
                <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
                <button class="h-5" onClick={this.props.close}>Back</button>
                <img class="block" src="/board.jpg"/>
                <svg class="block m-6 max-w-sm mx-auto inset-0 left-12 top-6 absolute" 
                width="700" height="550">
                    {this.state.holdsToRender}
                </svg>
                <h2>{this.props.data.name}</h2>
                <h2>{getGradeFromIndex(this.props.data.grade)}</h2>
                <br/>
                <br/>
                {this.props.completed? 
                    null:
                    <button onClick={this.routeCompleted}>Mark as sent</button>}
                <br/>
                <button onClick={this.openEditView}>Edit</button>
                </div>
            );
        } else if (this.state.editView) {
           return (
               <Create username={this.props.username} close={this.closeEditView} selectedHolds={this.props.data.holds} />
           ) 
        } else {
            return (
                <ReviewRoute reviewSent={()=>this.props.close()} close={this.closeReview} routeName={this.props.data.name} 
                             username={this.props.username} 
                             routeInfo={this.props.data}
                />
            )
        }
    }

}
export default RouteView;