import React from 'react';

class AttemptsSlider extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            mousePos: null,
            dragActive: false,
            currentMousePos: null,
            sliderPosition: 20,
            initialSliderPos: 20,
            sliderValue: null,
            hasBeenMoved: false

        }
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.mousePosition = this.mousePosition.bind(this);

    }    

    dragStart (event) {
        if (!this.state.hasBeenMoved) {
            this.setState({hasBeenMoved: true});
        }
        this.setState({mousePos: event.clientX,
                       dragActive: true
                    });
    }

    dragEnd (event) {
        let endPos = (this.state.initialSliderPos - 
            (this.state.mousePos - this.state.currentMousePos));
        this.setState({
                       dragActive: false,
                       sliderPosition: endPos,
                       initialSliderPos: endPos,
                       sliderValue: this.getValueFromPosition()
                    });
        this.props.passValues(this.getValueFromPosition());

    }

    mousePosition (event) {
        if (this.state.dragActive)  
            this.setState({currentMousePos: event.clientX});
    }

    determineSliderPosition () {
        let movedPosition = (this.state.initialSliderPos - 
            (this.state.mousePos - this.state.currentMousePos));
        
        if (this.state.dragActive) {
            return movedPosition;
        } else {
            return (this.state.sliderPosition);
        }
    }

    getValueFromPosition () {
      let value = (Math.floor((this.determineSliderPosition() / (100/5)) + 1))

      if (value < 5)
        return value
       else 
        return 5 
        
    }

    render () {

        return (
            <svg class="block" width="100" height="60"
                    onPointerMove={this.mousePosition}
                >
                <circle 
                    cx={this.determineSliderPosition()}
                    cy="40" r="5" 
                    fill-opacity="1" stroke="red"
                    fill="red"
                    stroke-width="4"
                    onPointerDown={this.dragStart}
                    onPointerUp={this.dragEnd}
                />
                <text class="select-none" x={this.determineSliderPosition() - 5} y="20"
                    onDrag={(event) => event.preventDefault()} 
                >
                    {this.state.hasBeenMoved? this.getValueFromPosition() : ""}
                </text>

                <line x1="0" y1="40" x2={this.determineSliderPosition() - 7} y2="40" stroke='white'/>
                <line x1={this.determineSliderPosition() + 7} y1="40" x2="100" y2="40" stroke='white'/>
            </svg>
        )
    }
}

export default AttemptsSlider;