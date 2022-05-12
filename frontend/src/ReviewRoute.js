import React from 'react';
import getGradeFromIndex from './GradeFromIndex';

class ReviewRoute extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            numOfAttempts: 1,
            gradeNum: 5,
            review: 1,
            comment: ""
        }

        this.incNumOfAttempts = this.incNumOfAttempts.bind(this);
        this.decNumOfAttempts = this.decNumOfAttempts.bind(this);

        this.incGrade = this.incGrade.bind(this);
        this.decGrade= this.decGrade.bind(this);

        this.incReview = this.incReview.bind(this);
        this.decReview = this.decReview.bind(this);

        this.commentChange = this.commentChange.bind(this);
        this.sendReview = this.sendReview.bind(this);
    }

    sendReview (event) {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8000/addRouteReview", true);
        xhr.setRequestHeader("Content-Type", "application/json");


		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {

            };
        };
        xhr.send(JSON.stringify({
            numOfAttempts: this.state.numOfAttempts,
            grade: this.state.gradeNum,
            review: this.state.review,
            comment: this.state.comment,
            username: this.props.username,
            routeName: this.props.routeName
            }
        ));
    
    }

    commentChange (event) {
        this.setState({comment: event.target.value});
    }

    incNumOfAttempts (event) {
        event.preventDefault();
        let curNum = this.state.numOfAttempts + 1;
        this.setState({numOfAttempts: curNum});
    }

    decNumOfAttempts (event) {
        event.preventDefault();
        if (this.state.numOfAttempts > 1) {
            let curNum = this.state.numOfAttempts - 1;
            this.setState({numOfAttempts: curNum});
        }
    }

    incGrade (event) {
        event.preventDefault();
        if (this.state.gradeNum < 21) {
            let curNum = this.state.gradeNum + 1;
            this.setState({gradeNum: curNum});
        }
    }

    decGrade (event) {
        event.preventDefault();
        if (this.state.gradeNum > 0) {
            let curNum = this.state.gradeNum - 1;
            this.setState({gradeNum: curNum});
        }
    }

    incReview (event) {
        event.preventDefault();
        if (this.state.review < 5) {
            let curNum = this.state.review + 1;
            this.setState({review: curNum});
        }
    }

    decReview (event) {
        event.preventDefault();
        if (this.state.review > 1) {
            let curNum = this.state.review - 1;
            this.setState({review: curNum});
        }
    }



    render () {
        return (
			<div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
                <h2>Name:  {this.props.routeInfo.name}</h2>
                <h2>Grade:  {getGradeFromIndex(this.props.routeInfo.grade)}</h2>
                <form onSubmit={this.sendReview}>

                    <label>
                        Number of attempts
                        <br/>
                        <button onClick={this.decNumOfAttempts}>-</button>
                        <h2>{this.state.numOfAttempts}</h2>
                        <button onClick={this.incNumOfAttempts}>+</button>
                    </label>
                    <br/>

                    <label>
                       Grade feel 
                        <br/>
                        <button onClick={this.decGrade}>-</button>
                        <h2>{getGradeFromIndex(this.state.gradeNum)}</h2>
                        <button onClick={this.incGrade}>+</button>
                    </label>
                    <br/>
                    <label>
                        Review 1-5
                        <br/>
                        <button onClick={this.decReview}>-</button>
                        <h2>{this.state.review}</h2>
                        <button onClick={this.incReview}>+</button>
                    </label>
                    <br/>
                    <label>
                        Comment
                        <br/>
                        <textarea value={this.state.comment} onChange={this.commentChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Done"/>
                </form>
            </div>
        );
    }

}

export default ReviewRoute;