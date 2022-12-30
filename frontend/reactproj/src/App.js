import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import LoginPage from './components/loginPage';
import Navbar from './components/navbar';
import Sidenav from './components/sidenav';
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
import Alert from './components/alert';
import Auth from './components/auth';

import PaymentLoading from './components/paymentLoading';
import PaymentCancelled from './components/paymentCancelled';

import PaymentPolicy from './components/paymentPolicy';
import MyEnrolledCourses from './components/myEnrolledCourses';
import RefundRequest from './components/refundRequest';
import CourseGuestPage from './components/courseGuestPage';
import UserPurchases from './components/userPurchases';
import PopUp from './components/popUp';
import MoneyOwedPerMonth from './components/moneyOwedPerMonth';



import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import InstructorCourses from './components/instructorCourses';*/
import TraineeExercise from './components/TraineeExercise';
import TraineeSolution from './components/TraineeSolution';
import TraineeViewCourseDetails from './components/traineeViewCourseDetails';
// import Signup from './components/signup';
import TakeNotes from './components/takeNotes2';

import NotFoundPage from './components/notFoundPage';
import PopularCourses from './components/popularCourses';


axios.defaults.withCredentials = true;
axios.defaults.headers = 'Access-Control-Allow-Origin: http://localhost:3000/';

axios.defaults.headers = 'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers = 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'

class App extends Component {

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

  state = {};
  handleCoursesChange = (c) => {
    // this.setState({courses: c},()=>{
    console.log(c);
    window.location.href = '/courses';
    // })
  };

  routeTo(path, component){

    console.log(path.split('/'))
    var userType = path.split('/')[1];

    
    return (
      <Route path={path} element={<Auth component={component} userType={userType}/>}></Route>
      )
  }


  routeTo3(path, component, userType){
    return (
      <Route path={path} element={<Auth component={component} userType={userType}/>}></Route>
      )
  }



  
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
          <div style={{
            display:'grid',
            gridTemplateColumns: (this.props.user.userType !== '' && window.location.href !== 'http://localhost:3000/'  )? '80px 1fr':'1fr'
        }}>
              {(window.location.href !== 'http://localhost:3000/'&& this.props.user.userType !== '')&&<Sidenav userType={this.props.user.userType}/>}
              <Alert/>
              <Routes >
          

              <Route exact path="/" element={<HomeLand />}></Route>
              <Route exact path="/login" element={<LoginPage />}></Route>
              <Route exact path="/signUp" element={<SignUpPage />}></Route>
  
              <Route exact path="/milestone1" element={<TmpRoutes />}></Route>
              <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
              <Route exact path="/changePassword" element={<ChangePassword />}></Route>
              <Route exact path="/passwordReset" element={<PasswordReset />}></Route>
              <Route exact path="/watchVideo" element={<WatchVideo />}></Route>
              <Route exact path="/guest" element={<Guest />}></Route>
  
              
  
  
              {/* ADMIN ROUTES */}
              {this.routeTo('/administrator/addUsers', <Admin />)}
              {this.routeTo('/administrator/promotions', <AddPromotions />)}
              {this.routeTo('/administrator', <AdminDB />)}
              {this.routeTo('/administrator/courseRequests', <AdminCourseReqs />)}
              {this.routeTo('/administrator/reports', <AdminReports />)}
  
  
  
              {/* INSTRUCTOR ROUTES */}
              {this.routeTo('/instructor', <InstructorDB />)}
              {this.routeTo('/instructor/createCourseOld', <Instructor />)}
              {this.routeTo('/instructor/courses', <InstructorCourses />)}
              {this.routeTo('/instructor/createQuiz', <CreateQuiz />)}
              {this.routeTo('/instructor/profile', <InstructorProfile />)}
              {this.routeTo('/instructor/createCourse', <NewCreateCourse />)}
              {this.routeTo('/instructor/myCourses', <InstructorCourses2 />)}
              {this.routeTo('/instructor/contracts', <Contracts />)}
              {this.routeTo('/instructor/money', <MoneyOwedPerMonth />)}
              

  
              
              
  
              {/* USERS ROUTES ( Indiviual&Corporate Trainee) */}
              {/* ~user~ for things that the indiviual & corporate trainee can access*/}
  
              {this.routeTo3('/user', <UserProfile />,'user')}
              {this.routeTo3('/user/profile', <UserProfile />,'user')}
              {this.routeTo3('/user/profile', <UserProfile />,'user')}
              {this.routeTo3('/user/courses', <MyEnrolledCourses />,'user')}
              {this.routeTo3('/user/myReports', <UserReports />,'user')}
              {this.routeTo3('/user/purchases', <UserPurchases />,'user')}

              {this.routeTo3('/user/requestCourseAccess', <RequestCourseAccess />,'corporate trainee')}
              {this.routeTo3('/user/topCourses', <PopularCourses />,'user')}
              {this.routeTo3('/user/courses/:courseId', <TraineeViewMyCourse />,'user')}
              {this.routeTo3('/user/instructor/:id', <ViewInstructorProfile />,'user')}







  
  
  
  
  
              <Route exact path="/exercise/solution" element={<TraineeSolution />}></Route>
              <Route exact path="/trainee" element={<Trainee />}></Route>
              <Route
                exact
                path="myCourseTrainee/content"
                element={<TraineeViewCourseDetails />}></Route>
              <Route exact path="exercise" element={<TraineeExercise />}></Route>
  
  
              <Route  path="viewInstructorProfile/:id" element={<ViewInstructorProfile />}></Route>
  
              <Route path="/courses/:search" element={<Courses />}></Route>
  
              <Route path="/*" element={<NotFoundPage />}></Route>
  
            </Routes>
          </div>

        </div>
      </Router>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) =>{

 return {
     lightTheme: state.lightTheme,
     primaryColor: state.primaryColor,
     user: state.user
 };
}


export default connect(mapStateToProps)(App)

// <Route exact path="/instructor/createCourse" element={<Instructor />}></Route>
