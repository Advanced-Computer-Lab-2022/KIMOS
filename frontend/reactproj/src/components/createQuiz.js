import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';
import axios from 'axios';

//array of objects
// each object
// question, choices, answer ( int )

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

class createQuiz extends Component {
  // steps = ['Write Your Question', 'Create an ad group', 'Create an ad'];
  showQuiz = () => {
    var validationResult = this.validateQuiz();
    console.log(validationResult)
    if(validationResult === -1){
      this.props.showAlert({shown:true, message:'Make sure all questions are written',severity:'error'})

    }
    if(validationResult === -2){
      this.props.showAlert({shown:true, message:'Make sure all questions have a correct answer',severity:'error'})
    }

    if(validationResult === 0){
      this.submitQuiz();
    }
  };
  validateQuiz = ()=>{
    var result = 0;
    if(this.state.questions.length === 1 && this.state.questions[0].question===''){
      result = -1;
    } 

    //check all questions not empty
    this.state.questions.forEach((question)=>{
      if(question.question === '')
      result =  -1;
    })

    //check all questions got a correct answer
    this.state.questions.forEach((question)=>{
      if(question.answer === -1){
        result =  -2;
      }

    })
    return result;
  }
  submitQuiz = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const courseId = queryParams.get('courseId');
    var url = 'http://localhost:5000/courses/exam?courseId='+courseId;

    var data = {
      exam : { title: 'Final Exam',
      exercises: this.state.questions}
    }
    if(queryParams.get('subtitleId')){
      console.log("submitting a subtitel quiz")
      data['subtitleId'] = queryParams.get('subtitleId');
      url = 'http://localhost:5000/courses/subtitle/quiz?courseId='+courseId+'&subtitleId='+ queryParams.get('subtitleId');
    }else{
      console.log("subbm final exam")
    }


    try {
      const res = await axios.post(
        url,
        data,
        {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
        if(res.data.success){
          this.props.showAlert({shown:true, message:'Created your exam',severity:'success'})
          window.location.href = '/instructor';
        }
        else{
          this.props.showAlert({shown:true, message:'Couldnt create the exam',severity:'error'})
        }
      // console.log(res);
    } catch (e) {

      var mssg = e.response.data.message? e.response.data.message :'Couldnt Update your course Visibility2'
      this.props.showAlert({shown:true, message:mssg,severity:'error'})
    }
  };
  state = {
    questions: [{ id: 0, question: '', choices: [], answer: -1 }],
    currentQ: 0,
    lastQ: 1
  };
  // object { question:'', choices:[], answer:'' }

  handleChange = (e) => {
    var newInfo = [...this.state.questions];
    newInfo[this.state.currentQ][e.target.id] = e.target.value;
    this.setState({ questions: newInfo });
  };
  handleAddQuestion = () => {
    var tmp = [...this.state.questions];
    tmp.push({
      id: this.state.lastQ + 1,
      question: '',
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      answer: -1
    });
    this.setState({ questions: tmp, currentQ: this.state.lastQ, lastQ: this.state.lastQ + 1 });
  };
  logQuestion = () => {
    console.log(this.state.questions);
  };
  changeDisplayedQuestion = (index) => {
    this.setState({ currentQ: index });
  };
  displayQuestions = () => {
    return this.state.questions.map((question, index) => {

      return(
          <div className= {`question ${this.state.currentQ === index? 'selected-q':''}`} onClick={() => {this.changeDisplayedQuestion(index)}}>
              Question {index+1}
          </div>
      )
    });
  };
  correctChoice = (index) => {
    var newInfo = [...this.state.questions];
    newInfo[this.state.currentQ]['answer'] = index;
    this.setState({ questions: newInfo });
  };
  choice = (index, choice, correct) => {
    var value = 'c' + index;
    const info = this.state.questions[this.state.currentQ];

    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Choice {index}</InputLabel>
        <OutlinedInput
          value={info[value]}
          // id="outlined-adornment-password"
          // type={values.showPassword ? 'text' : 'password'}
          // value={values.password}
          id={value}
          onChange={this.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton style={{ backgroundColor: correct ? '#339966' : 'var(--cool-grey)' }} edge="end" onClick={() => this.correctChoice(index)}>
                <CheckIcon style={{ color: correct? 'white':'grey' }} />
              </IconButton>
            </InputAdornment>
          }
          label={'Choice ' + index}
        />
      </FormControl>
    );
  };
  question = () => {
    const info = this.state.questions[this.state.currentQ];
    return (
      <div className="create-quiz__questions__question">
        <h1>Question {this.state.currentQ + 1}</h1>
        <div className="create-quiz__questions__question__what">
          <TextField
            value={info['question']}
            onChange={this.handleChange}
            id="question"
            label="Question"
            variant="filled"
            multiline
            rows={4}
            fullWidth
            required
          />
        </div>
        <div className="create-quiz__questions__question__choices">
          {this.choice(1, 'choice_1', info['answer'] === 1)}
          {this.choice(2, 'choice_1', info['answer'] === 2)}
          {this.choice(3, 'choice_1', info['answer'] === 3)}
          {this.choice(4, 'choice_1', info['answer'] === 4)}
        </div>
        <div className="create-quiz__questions__question__options">
          <SecondaryBtn function={this.handleAddQuestion} btnText="Add Question" />
          <PrimaryBtn function={this.showQuiz} btnText="Submit Quiz" />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="create-quiz">
        <div className="questions-display">{this.displayQuestions()}</div>
        <div className="create-quiz__questions">{this.question()}</div>
      </div>
    );
  }
}



export default connect(null, {showAlert})(createQuiz);
