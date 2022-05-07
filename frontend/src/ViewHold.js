import React from "react";

class ViewHold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {
        let color;
        if (this.props.type == "Default")
            color = "black";
        else if (this.props.type == "Start")
            color = "green";
        else if (this.props.type == "Top")
            color = "red";
        else if (this.props.type == "Feet")
            color = "blue";
        
        return (
           <rect   
                  x={this.props.x} y={this.props.y} 
                  width = {this.props.w} height = {this.props.h} 
                  fill-opacity="0" stroke={color}
                  stroke-width="2"
            />
        )
    }
}

export default ViewHold;