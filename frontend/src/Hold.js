import React from "react";

class Hold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            type: "Default"
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.changeShownState = this.changeShownState.bind(this);
    }

    changeShownState () {
        let currentState = this.state.show;
        this.setState({show: !currentState});
    }

    clickHandler () {
        if (!this.state.show) {
            this.changeShownState();
        } else if (this.state.show && this.state.type == this.props.type) {
            this.changeShownState();
        }
            
        this.props.handler(this.props.x, this.props.y,
                           this.props.h, this.props.y,
                           this.props.key
                           );
        this.setState({type: this.props.type});
    }

    render () {
        let color;
        if (this.state.type == "Default")
            color = "black";
        else if (this.state.type == "Start")
            color = "green";
        else if (this.state.type == "Top")
            color = "red";
        else if (this.state.type == "Feet")
            color = "blue";
        
        return (
           <rect  onClick={this.clickHandler} 
                  stroke-opacity={this.state.show ? 1 : 0 } 
                  x={this.props.x} y={this.props.y} 
                  width = {this.props.w} height = {this.props.h} 
                  fill-opacity="0" stroke={color}
                  stroke-width="2"
            />
        )
    }
}

export default Hold;