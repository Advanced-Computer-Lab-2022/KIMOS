import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import Instructor from './components/instructor';
import Trainee from './components/trainee';
import Courses from './components/courses';
import MyCourses from './components/myCourses';
import CourseDetials from './components/courseDetails';
import axios from 'axios';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';


class App extends Component {
  getCountry = async(newCountry)=>{
    
    const body = { 'newCountry': newCountry };

    try {
        const res = await axios.get('http://localhost:3000/country',body,{headers:{"Access-Control-Allow-Origin": "*"}});

        
    } catch (e) {

    }
  }
  state = {

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
            <Navbar selectCourses={this.handleCoursesChange}/>

            <Routes>
                    <Route exact path="/" element={<TmpRoutes />}></Route>
                    <Route exact path='/guest' element={<Guest />}></Route>
                    <Route exact path='/admin' element={<Admin />}></Route> 
                    <Route exact path='/instructor' element={<Instructor />}></Route>
                    <Route exact path='/trainee' element={<Trainee />}></Route>
                    <Route  path='/courses/:search' element={<Courses />}></Route>
                    <Route path='/islam' element={<MyCourses />}></Route>
                    <Route exact path='/courseDetails' element={<CourseDetials id = "63557a87ed2ca8a28a1a8861"/>}></Route>
                    <Route exact path='/myCourses' element={<MyCourses id = "635387b65b29f183de6e32d6"/>}></Route>

            </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
