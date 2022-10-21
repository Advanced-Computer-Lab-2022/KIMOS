import React, { Component } from 'react';
import TmpRoutes from './components/tmpRoutes';
import Navbar from './components/navbar';
import Guest from './components/guest';
import Admin from './components/admin';
import Instructor from './components/instructor';
import Trainee from './components/trainee';
import Courses from './components/courses';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


class App extends Component {
  exampleFunction = ()=>{
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
            <Navbar selectCourses={this.handleCoursesChange}/>

            <Routes>
                    <Route exact path="/" element={<TmpRoutes />}></Route>
                    <Route exact path='/guest' element={<Guest />}></Route>
                    <Route exact path='/admin' element={<Admin />}></Route>
                    <Route exact path='/instructor' element={<Instructor />}></Route>
                    <Route exact path='/trainee' element={<Trainee />}></Route>
                    <Route  path='/courses/:search' element={<Courses />}></Route>


            </Routes>
        </div>
      </Router>

    );
  }
}

export default App;