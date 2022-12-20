import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import LoginPage from './components/loginPage';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import AdminDB from './components/adminDB';
import AddPromotions from './components/addPromotions';
import Instructor from './components/instructor';
import InstructorDB from './components/instructorDB';
import InstructorProfile from './components/instructorProfile';
import InstructorCourses2 from './components/instructorCourses2';
import Trainee from './components/trainee';
import TraineeViewMyCourse from './components/traineeViewMyCourse';
import Courses from './components/courses';
import InstructorCourses from './components/instructorCourses';
import CreateQuiz from './components/createQuiz';
import Contracts from './components/contracts';
import ChangePassword from './components/changePassword';
import ForgotPassword from './components/forgotPassword';
import WatchVideo from './components/watchVideo';
import PasswordReset from './components/passwordReset';
import ViewInstructorProfile from './components/viewInstructorProfile';
import HomeLand from './components/homeLand';
import UserReports from './components/userReports';
import AdminReports from './components/adminReports';
import RequestCourseAccess from './components/requestCourseAccess';
import AdminCourseReqs from './components/adminCourseReqs';
import UserProfile from './components/userProfile';
import Loading from './components/loadingPage';
import NewCreateCourse from './components/newCreateCourse';
import SignUpPage from './components/signUp';

import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import InstructorCourses from './components/instructorCourses';*/
import TraineeExercise from './components/TraineeExercise';
import TraineeSolution from './components/TraineeSolution';
import TraineeViewCourseDetails from './components/traineeViewCourseDetails';


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
        <div
          className={
            this.props.lightTheme
              ? 'main-content-light main-content'
              : 'main-content-dark main-content'
          }>
          <Navbar selectCourses={this.handleCoursesChange} />
          <Routes>
          
            <Route exact path="/" element={<HomeLand />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/signUp" element={<SignUpPage />}></Route>

            <Route exact path="/milestone1" element={<TmpRoutes />}></Route>
            <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route exact path="/changePassword" element={<ChangePassword />}></Route>
            <Route exact path="/passwordReset" element={<PasswordReset />}></Route>
            <Route exact path="/watchVideo" element={<WatchVideo />}></Route>
            <Route exact path="/guest" element={<Guest />}></Route>
            <Route exact path="/admin/addUsers" element={<Admin />}></Route>
            <Route exact path="/admin/promotions" element={<AddPromotions />}></Route>
            <Route exact path="/admin" element={<AdminDB />}></Route>
            <Route exact path="/admin/courseRequests" element={<AdminCourseReqs />}></Route>
            


            
            
            <Route exact path="/instructor/createCourseOld" element={<Instructor />}></Route>


            <Route exact path="/instructor" element={<InstructorDB />}></Route>
            <Route exact path="/instructor/courses" element={<InstructorCourses />}></Route>
            <Route path="/instructor/createQuiz" element={<CreateQuiz />}></Route>
            <Route exact path="/instructor/profile" element={<InstructorProfile />}></Route>
            <Route exact path="/instructor/createCourse" element={<NewCreateCourse />}></Route>

            
            <Route exact path="/user/profile" element={<UserProfile />}></Route>
            <Route exact path="/user/reports" element={<UserReports />}></Route>
            <Route exact path="/user/requestCourseAccess" element={<RequestCourseAccess />}></Route>
            <Route exact path="/admin/reports" element={<AdminReports />}></Route>



            <Route exact path="/exercise/solution" element={<TraineeSolution />}></Route>
            <Route exact path="/trainee" element={<Trainee />}></Route>
            <Route exact path="myCourseTrainee" element={<TraineeViewMyCourse />}></Route>
            <Route
              exact
              path="myCourseTrainee/content"
              element={<TraineeViewCourseDetails />}></Route>
            <Route exact path="exercise" element={<TraineeExercise />}></Route>
            <Route exact path="loading" element={<Loading />}></Route>

            <Route  path="viewInstructorProfile/:id" element={<ViewInstructorProfile />}></Route>


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

 return {
     lightTheme: state.lightTheme,
     primaryColor: state.primaryColor
 };
}


export default connect(mapStateToProps)(App)

// <Route exact path="/instructor/createCourse" element={<Instructor />}></Route>
