import React from 'react';

class Back extends React.Component {
    render() {
	return (
		<div class="rounded-sm bg-red-300 sticky top-0 w-full">
			<button class="pt-3" onClick = {() => this.props.handler("home")}>Back</button>
		</div>
	);
    }
}

export default Back;
