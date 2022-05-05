import React from "react";

class Hold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.changeShownState = this.changeShownState.bind(this);
    }

    changeShownState () {
        let currentState = this.state.show;
        this.setState({show: !currentState});
    }

    render () {
        return (
           <rect  onClick={this.changeShownState} 
                  stroke-opacity={this.state.show ? 1 : 0 } 
                  x={this.props.x} y={this.props.y} 
                  width = {this.props.w} height = {this.props.h} 
                  fill-opacity="0" stroke="black" 
                  stroke-width="2"
            />
        )
    }
}

export default Hold;