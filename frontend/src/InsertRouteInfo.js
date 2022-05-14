import React from 'react';

class InsertRouteInfo extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        gradeNum: 4,
        name: "",
        description: "",
        feetType: ""
      };
      this.changeGrade = this.changeGrade.bind(this);
      this.nameInputHandler = this.nameInputHandler.bind(this);
      this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
      this.feetChangeHandler = this.feetChangeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
  }

  changeGrade (operation) {
      if (operation == '-' && this.state.gradeNum > 0)
        this.setState({gradeNum: --this.state.gradeNum});
       else if (operation == '+' == this.state.gradeNum < 21) 
        this.setState({gradeNum: ++this.state.gradeNum});
  }

  getGradeFromIndex (index) {
      let gradeArr = [
        '4', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c+',
        '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b',
        '8b+', '8c', '8c+'
      ];
      return gradeArr[index];
  }

  nameInputHandler (event) {
      this.setState({name: event.target.value});
  }
  
  descriptionInputHandler (event) {
      this.setState({description: event.target.value});
  }

  feetChangeHandler (event) {
      this.setState({feetType: event.target.value});
  }

  submitHandler (event) {
    event.preventDefault();
    let inputData = {
        name: this.state.name,
        description: this.state.description,
        feet: this.state.feetType,
        grade: this.state.gradeNum
    }
    this.props.handler(inputData);
  }

  render () {
      return (
          <div>
            <div>
                <button onClick={this.props.close}>Return</button>
                <button onClick={() => this.changeGrade('-')}>-</button>
                <h1>{this.getGradeFromIndex(this.state.gradeNum)}</h1>
                <button onClick={() => this.changeGrade('+')}>+</button>
            </div>
            <form onSubmit={this.submitHandler}>
                <label>
                    Name
                    <input onChange={this.nameInputHandler} type="text" value={this.state.name}/>
                </label>
                <label>
                    Description
                    <textarea onChange={this.descriptionInputHandler} value={this.state.description}/>
                </label>
                <div onChange={this.feetChangeHandler}>
                    <input type="radio" value = "Open feet" name="feetType" /> Open Feet
                    <input type="radio" value = "Feet follow hands" name="feetType" /> Feet follow hands
                    <input type="radio" value = "No feet" name="feetType" /> No feet
                </div>
                <input type="submit" value="Add route"/>
            </form>
          </div>
      )
  }

}

export default InsertRouteInfo;