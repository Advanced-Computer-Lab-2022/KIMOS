import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import Instructor from './components/instructor';
import Trainee from './components/trainee';
import TraineeViewMyCourse from './components/traineeViewMyCourse';
import Courses from './components/courses';
import InstructorCourses from './components/instructorCourses';


import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



class App extends Component {
  exampleFunction = () => {
    alert("Seweeyyy");
  }
  state = {
    courses: ['damn']
  }
  handleCoursesChange = (c)=>{
    // this.setState({courses: c},()=>{
      console.log(c);
      window.location.href = '/courses'
    // })
  }

  render() {
    return (
      <Router>
        <div className="main-content">
          <Navbar selectCourses={this.handleCoursesChange} />
          <Routes>
            <Route exact path="/" element={<LoginPage />}></Route>
            <Route exact path="/milestone1" element={<TmpRoutes />}></Route>
            <Route exact path="/guest" element={<Guest />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/instructor" element={<Instructor />}></Route>
            <Route exact path="/trainee" element={<Trainee />}></Route>
            <Route exact path="course/viewCourse/:id" element={<TraineeViewMyCourse />}></Route>
            <Route exact path="/instructor/courses" element={<InstructorCourses />}></Route>
            <Route path="/copt/courses/:search" element={<Courses />}></Route>
            <Route path="/it/courses/:search" element={<Courses />}></Route>
            <Route path="/courses/:search" element={<Courses />}></Route>

          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
