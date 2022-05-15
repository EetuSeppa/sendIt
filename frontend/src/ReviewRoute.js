import React from 'react';
import getGradeFromIndex from './GradeFromIndex';
import RouteOverview from './RouteOverview';

class ReviewRoute extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            numOfAttempts: 1,
            gradeNum: 5,
            review: 1,
            comment: "",
            dateString: null
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
        
        this.props.reviewSent();
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

    componentDidMount () {
        if (this.props.routeInfo.date) {
            let splitDate = this.props.routeInfo.date.split(/\D+/);
            let year = splitDate[0];
            let month = splitDate[1];
            let day = splitDate[2];
            this.setState({dateString: day + '.' + month + '.' + year});
        } else {
            this.setState({dateString: ""});
        }

    }



    render () {
        return (
			<div class="p-6 max-w-sm mx-auto bg-red-300 rounded-xl">
                <button class="mb-7" onClick={this.props.close}>Back</button>
                <div class="flex">
                    <RouteOverview holds={this.props.routeInfo.holds} />
                    <div class="">
                        <h2 class="">Name:  {this.props.routeInfo.name}</h2>
                        <h2 class="">Grade:  {getGradeFromIndex(this.props.routeInfo.grade)}</h2>
                        <h2 class="">Date: {this.state.dateString}</h2>
                    </div>
                </div>
                <form onSubmit={this.sendReview}>

                    <label>
                        Number of attempts
                        <br/>
                        <button class="inline text-3xl" onClick={this.decNumOfAttempts}>-</button>
                        <h2 class="inline m-4" >{this.state.numOfAttempts}</h2>
                        <button class="inline text-3xl" onClick={this.incNumOfAttempts}>+</button>
                    </label>
                    <br/>

                    <label>
                       Grade feel 
                        <br/>
                        <button class="inline text-3xl" onClick={this.decGrade}>-</button>
                        <button class="inline relative text-3xl left-20" onClick={this.incGrade}>+</button>
                        <h2 class="inline m-3">{getGradeFromIndex(this.state.gradeNum)}</h2>
                    </label>
                    <br/>
                    <label>
                        Review 1-5
                        <br/>
                        <button class="inline text-3xl" onClick={this.decReview}>-</button>
                        <h2 class="inline m-4">{this.state.review}</h2>
                        <button class="inline text-3xl" onClick={this.incReview}>+</button>
                    </label>
                    <br/>
                    <label>
                        <h2 class="mt-5">Comment</h2>
                        <textarea value={this.state.comment} onChange={this.commentChange} />
                    </label>
                    <input class="mt-1 p-2 rounded-xl border-2 float-right" type="submit" value="Done"/>
                </form>
            </div>
        );
    }

}

export default ReviewRoute;