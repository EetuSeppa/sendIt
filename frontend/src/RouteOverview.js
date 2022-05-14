import React from 'react';

import ViewHold from './ViewHold';

class RouteOverview extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            holdsToDisplay: null
        }
    }

    componentDidMount () {
        let holdArray = [];
        this.props.holds.forEach ((elem, index) => {
        holdArray.push(<ViewHold x={elem.x / 6} y={elem.y / 6}
                           h={elem.h / 20} w={elem.w / 20}
                           type={elem.type}
                           key={index}
                      />
                  );
        });
        this.setState({holdsToDisplay: holdArray});

    }

    render() {
        return (
            <div>
                <svg width="100" height="100">
                    {this.state.holdsToDisplay}
                </svg>
            </div>
        )
    }
}

export default RouteOverview;