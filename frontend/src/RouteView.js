import React from 'react';
import ViewHold from './ViewHold';

class RouteView extends React.Component {
	constructor(props) {
        super(props);
    }

    loadHolds () {
        let holds = [];
        this.props.data.holds.forEach ((elem, index) => {
            console.log(elem);
          holds.push(<ViewHold x={elem.x} y={elem.y}
                           h={elem.h} w={elem.w}
                           type={elem.type}
                           id={index}
                      />
                    );
        })
    
        return holds;
    }

    render() {
        let holdsToRender = this.loadHolds();
        return (
            <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
              <img class="block" src="https://27crags.s3.amazonaws.com/photos/000/170/170566/huge-36b290a1ec75.jpg"/>
              <svg class="p-6 max-w-sm mx-auto inset-0 absolute" width="400px" height="350">
                {holdsToRender}
              </svg>
            </div>
        );
    }

}
export default RouteView;