import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import Instructor from './components/instructor';
import Trainee from './components/trainee';
import TraineeViewMyCourse from './components/traineeViewMyCourse';
import Courses from './components/courses';
<<<<<<< HEAD
/*import InstructorCourses from './components/instructorCourses';*/
import TraineeExercise from './components/traineeExercise';
=======
import InstructorCourses from './components/instructorCourses';
import CreateQuiz from './components/createQuiz';
import Contracts from './components/contracts';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {connect} from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import InstructorCourses from './components/instructorCourses';*/
import TraineeExercise from './components/TraineeExercise'



>>>>>>> marsafy


<<<<<<< HEAD
=======


>>>>>>> marsafy
class App extends Component {
  exampleFunction = () => {
    alert('Seweeyyy');
  };
  state = {
    courses: ['damn']
  };
  handleCoursesChange = (c) => {
    // this.setState({courses: c},()=>{
    console.log(c);
    window.location.href = '/courses';
    // })
  };

  render() {
    return (
      <Router>
<<<<<<< HEAD
        <div className="main-content">
          <Navbar selectCourses={this.handleCoursesChange} />
          <Routes>
            <Route exact path="/milestone1" element={<TmpRoutes />}></Route>
            <Route exact path="/guest" element={<Guest />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/instructor" element={<Instructor />}></Route>
            <Route exact path="/trainee" element={<Trainee />}></Route>
            <Route exact path="myCourseTrainee" element={<TraineeViewMyCourse />}></Route>
            <Route exact path="exercise" element={<TraineeExercise />}></Route>
            {/*<Route exact path="/instructor/courses" element={<InstructorCourses />}></Route>*/}
            <Route path="/copt/courses/:search" element={<Courses />}></Route>
            <Route path="/it/courses/:search" element={<Courses />}></Route>
            <Route path="/courses/:search" element={<Courses />}></Route>
=======
        <div className={this.props.lightTheme ? 'main-content-light main-content':'main-content-dark main-content'}>
          <Navbar selectCourses={this.handleCoursesChange} />
          <Routes>
            <Route exact path="/" element={<LoginPage />}></Route>
            <Route exact path="/milestone1" element={<TmpRoutes />}></Route>
            <Route exact path="/guest" element={<Guest />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/instructor" element={<InstructorDB />}></Route>
            <Route exact path="/instructor/courses" element={<InstructorCourses />}></Route>
            <Route path="/instructor/createQuiz" element={<CreateQuiz />}></Route>
            <Route exact path="/instructor/profile" element={<InstructorProfile />}></Route>
            <Route exact path="/instructor/createCourse" element={<Instructor />}></Route>
            
            <Route exact path="/trainee" element={<Trainee />}></Route>
            <Route exact path="myCourseTrainee" element={<TraineeViewMyCourse />}></Route>
            <Route exact path="exercise" element={<TraineeExercise />}></Route>
            

            <Route exact path="/instructor/myCourses" element={<InstructorCourses2 />}></Route>
            <Route exact path="/instructor/contracts" element={<Contracts />}></Route>

            <Route path="/copt/courses/:search" element={<Courses />}></Route>
            <Route path="/it/courses/:search" element={<Courses />}></Route>
            <Route path="/courses/:search" element={<Courses />}></Route>

>>>>>>> marsafy
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
