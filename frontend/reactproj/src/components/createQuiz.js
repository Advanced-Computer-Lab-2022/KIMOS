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
import axios from 'axios';

//array of objects
// each object
// question, choices, answer ( int )

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

export default class createQuiz extends Component {
  // steps = ['Write Your Question', 'Create an ad group', 'Create an ad'];
  showQuiz = () => {
    this.submitQuiz();
  };
  submitQuiz = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const courseId = queryParams.get('courseId');

    try {
      const res = await axios.post(
        'http://localhost:5000/courses/exam?user[userId]=638117c243cba3f0babcc3a9',
        {
          courseId: courseId,
          exercises: this.state.questions
        },
        {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  state = {
    questions: [{ id: 0, question: '', choices: [], correct_answer: 1 }],
    currentQ: 0,
    lastQ: 1
  };
  // object { question:'', choices:[], correct_answer:'' }

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
      correct_answer: 1
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
    newInfo[this.state.currentQ]['correct_answer'] = index;
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
              <IconButton edge="end" onClick={() => this.correctChoice(index)}>
                <CheckIcon style={{ color: correct ? 'green' : 'grey' }} />
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
          />
        </div>
        <div className="create-quiz__questions__question__choices">
          {this.choice(1, 'choice_1', info['correct_answer'] === 1)}
          {this.choice(2, 'choice_1', info['correct_answer'] === 2)}
          {this.choice(3, 'choice_1', info['correct_answer'] === 3)}
          {this.choice(4, 'choice_1', info['correct_answer'] === 4)}
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
