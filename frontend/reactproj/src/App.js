import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import LoginPage from './components/loginPage';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import Instructor from './components/instructor';
import InstructorDB from './components/instructorDB';
import InstructorProfile from './components/instructorProfile';
import InstructorCourses2 from './components/instructorCourses2';
import Trainee from './components/trainee';
import Courses from './components/courses';
import InstructorCourses from './components/instructorCourses';
import CreateQuiz from './components/createQuiz';
import Contracts from './components/contracts';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {connect} from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


class App extends Component {


  componentDidMount(){
    console.log('it is');

    console.log(this.props);
  }
  theme = createTheme({
    
    palette: {
      primary: {
        main: this.props.primaryColor,
        },
      secondary: {
        main: '#FFFF7E'
      }
    }
  });
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.primaryColor !== this.props.primaryColor) {
      this.theme = createTheme({
    
        palette: {
          primary: {
            main: this.props.primaryColor,
            },
          secondary: {
            main: '#FFFF7E'
          }
        }
      });
    }
  }
  getCountry = async (newCountry) => {
    const body = { newCountry: newCountry };

    try {
      const res = await axios.get('http://localhost:5000/country', body, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {}
  };
  state = {};
  handleCoursesChange = (c) => {
    // this.setState({courses: c},()=>{
    console.log(c);
    window.location.href = '/courses';
    // })
  };

  render() {
    return (
      <ThemeProvider theme={this.theme}>
      <Router>
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

            

            <Route exact path="/instructor/myCourses" element={<InstructorCourses2 />}></Route>
            <Route exact path="/instructor/contracts" element={<Contracts />}></Route>

            <Route path="/copt/courses/:search" element={<Courses />}></Route>
            <Route path="/it/courses/:search" element={<Courses />}></Route>
            <Route path="/courses/:search" element={<Courses />}></Route>

          </Routes>
        </div>
      </Router>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) =>{
   console.log(state);
  return {
      lightTheme: state.lightTheme,
      primaryColor: state.primaryColor
  };
}


export default connect(mapStateToProps)(App)
  