import React from "react";

class Homepage extends React.Component {
    render () {
    return (
        <div class="homepage">
            <h1 className="font-bold underline">Welcome</h1>
            <br/>
            <div >
                <button onClick = {() => this.props.handler("browse")}>Browse climbs</button>
                <button>Create a climb</button>
                <button>History</button>
                <button>Progress</button>
            </div>
        </div>
    );
    }
}
export default Homepage;