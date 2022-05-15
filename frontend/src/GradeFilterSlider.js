import React from 'react';

class GradeFilterSlider extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            min_mousePos: null,
            min_dragActive: false,
            min_currentMousePos: null,
            min_sliderPosition: 20,
            min_initialSliderPos: 20,

            max_mousePos: null,
            max_dragActive: false,
            max_currentMousePos: null,
            max_sliderPosition: 80,
            max_initialSliderPos: 80,
        }
        this.min_dragStart = this.min_dragStart.bind(this);
        this.min_dragEnd = this.min_dragEnd.bind(this);
        this.mousePosition = this.mousePosition.bind(this);

        this.max_dragStart = this.max_dragStart.bind(this);
        this.max_dragEnd = this.max_dragEnd.bind(this);

    }    

    componentDidMount () {
        this.props.gradeHandler(
            Math.floor(this.min_determineSliderPosition() / (100/22)),
            Math.floor(this.max_determineSliderPosition() / (100/22))
        )
    }

    min_getGradeFromPosition () {
      let gradeArr = [
        '4', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c+',
        '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b',
        '8b+', '8c', '8c+'
      ];
      let index = Math.floor(this.min_determineSliderPosition() / (100/22));
      return gradeArr[index];
    }

    min_dragStart (event) {
        this.setState({min_mousePos: event.clientX,
                       min_dragActive: true
                    });
    }

    min_dragEnd (event) {
        let endPos = (this.state.min_initialSliderPos - 
            (this.state.min_mousePos - this.state.min_currentMousePos));
        this.setState({
                       min_dragActive: false,
                       min_sliderPosition: endPos,
                       min_initialSliderPos: endPos
                    });

        //Update grades in parent class
        this.props.gradeHandler(
            Math.floor(this.min_determineSliderPosition() / (100/22)),
            Math.floor(this.max_determineSliderPosition() / (100/22))
        )
    }

    mousePosition (event) {
        if (this.state.min_dragActive)  
            this.setState({min_currentMousePos: event.clientX});
        else if (this.state.max_dragActive)  
            this.setState({max_currentMousePos: event.clientX});
    }

    min_determineSliderPosition () {
        let movedPosition = (this.state.min_initialSliderPos - 
            (this.state.min_mousePos - this.state.min_currentMousePos));
        
        if (this.state.min_dragActive) {
            return movedPosition;
        } else {
            return (this.state.min_sliderPosition);
        }
    }

    max_getGradeFromPosition () {
      let gradeArr = [
        '4', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c+',
        '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b',
        '8b+', '8c', '8c+'
      ];
      let index = Math.floor(this.max_determineSliderPosition() / (100/22));
      return gradeArr[index];
    }

    max_dragStart (event) {
        this.setState({max_mousePos: event.clientX,
                       max_dragActive: true
                    });
    }

    max_dragEnd (event) {
        let endPos = (this.state.max_initialSliderPos - 
            (this.state.max_mousePos - this.state.max_currentMousePos));
        this.setState({
                       max_dragActive: false,
                       max_sliderPosition: endPos,
                       max_initialSliderPos: endPos
                    });

        //Update grades in parent class
        this.props.gradeHandler(
            Math.floor(this.min_determineSliderPosition() / (100/22)),
            Math.floor(this.max_determineSliderPosition() / (100/22))
        )
    }

    max_determineSliderPosition () {
        let movedPosition = (this.state.max_initialSliderPos - 
            (this.state.max_mousePos - this.state.max_currentMousePos));
        
        if (this.state.max_dragActive) {
            return movedPosition;
        } else {
            return (this.state.max_sliderPosition);
        }
    }

    render () {

        return (
            <svg class="block" width="100" height="60"
                    onPointerMove={this.mousePosition}
                >
                <circle 
                    cx={this.min_determineSliderPosition()}
                    cy="40" r="5" 
                    fill-opacity="1" stroke="red"
                    fill="red"
                    stroke-width="4"
                    onPointerDown={this.min_dragStart}
                    onPointerUp={this.min_dragEnd}
                />
                <text x={this.min_determineSliderPosition() - 10} y="20"
                    onDrag={(event) => event.preventDefault()} 
                >
                    {this.min_getGradeFromPosition()}
                </text>

                <circle 
                    cx={this.max_determineSliderPosition()}
                    cy="40" r="5" 
                    fill-opacity="1" stroke="red" 
                    fill="red"
                    stroke-width="4"
                    onPointerDown={this.max_dragStart}
                    onPointerUp={this.max_dragEnd}
                />
                <text x={this.max_determineSliderPosition() - 10} y="20"
                    onDrag={(event) => event.preventDefault()} 
                >
                    {this.max_getGradeFromPosition()}
                </text>
                <line x1="0" y1="40" x2={this.min_determineSliderPosition() - 7} y2="40" stroke='white'/>
                <line x1={this.max_determineSliderPosition() + 7} y1="40" x2="100" y2="40" stroke='white'/>
                <line x1={this.min_determineSliderPosition()} y1="40" x2={this.max_determineSliderPosition()} y2="40" stroke='red'/>
            </svg>
        )
    }
}

export default GradeFilterSlider;