import React from 'react';

class Back extends React.Component {
    render() {
	return (
		<div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
		<div class="space-x-5"> 
		<button class="hover:bg-red-500" onClick = {() => this.props.handler("home")}>Back</button>
		</div>
		</div>
	);
    }
}

export default Back;
