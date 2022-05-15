import React from "react";

class Homepage extends React.Component {
    render () {
    return (
        <div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
            <h1 class="text-center font-bold">Welcome</h1>
            <img src="/climber.jpg"
                 class="object-center rounded-xl shadow-2xl"></img>
            <div class="pt-4 flex space-x-5"> 
                <button onClick = {() => this.props.handler("browse")}>Browse climbs</button>
                <button onClick = {() => this.props.handler("create")}>Create a climb</button>
                <button onClick = {() => this.props.handler("history")}>History</button>
                <button onClick = {() => this.props.handler("progress")}>Progress</button>
            </div>
        </div>
    );
    }
}
export default Homepage;