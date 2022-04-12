import React from 'react';
import Back from './Back';

class Browse extends React.Component {
    render() {
	return (
	    <Back handler={this.props.handler}/>
	);
    }
}

export default Browse;
