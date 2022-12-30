import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import PrimaryButton from './buttons/primaryBtn';
import { Link, redirect } from 'react-router-dom';

import { setUser, showAlert } from '../redux/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';
import LoadingPage from './loadingPage';


class loginPage extends Component {

  state = {

    username:"",
    password:""


  }
  redirect = (userType) =>{


    var type = userType;
    if(userType === 'corporate trainee' || userType === 'individual trainee' )
      type = 'user'
    window.location.href = type;
  }
  signIn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login',{
        username: this.state.username,
        password: this.state.password
      }, {
        headers: { 
          'Access-Control-Allow-Origin': 'http://localhost:3000/'
        }
      });

      //update the user if payload is success
      if(res.data.success === true){
        this.props.setUser(res.data.payload)


        this.redirect(res.data.payload.userType)
      }


      // this.setState({ instructor: info, new_instructor: info });
    } catch (e) {

    }
  };

  handleChange = (e)=>{
  
    this.setState({[e.target.id]:e.target.value})

  }
  logIn = ()=>{
    var type = "";
    if(this.state.username==="admin"){
        type = "admin"
    }
    if(this.state.username==="instructor"){
        type = "instructor"
    }
    if(this.state.username==='shahd'){
        type='myCourseTrainee'
    }
    if(this.state.username==="IT"){
        type = "individual trainee"
    }
    if(this.state.username==="COT"){
        type = "corporate trainee"
    }

    this.props.setUser({username:this.state.username, userType:type})
    var href = type;
    if(type === "individual trainee")
        href = "it/courses/search?q=&page=1";
    if(type === "corporate trainee")
        href = "copt/courses/search?q=&page=1";
    localStorage.setItem('userData', JSON.stringify({username:this.state.username, userType:type}))
    window.location.href = href;
    //will validate later.

  }
  render() {
    return (
      
      <div className="login-page">

        <div className='login-page__form'>
            <div className="login-page__form__left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac nulla fringilla sem lacinia commodo.
            </div>
            <div className="login-page__form__info">
                <div className='login-page__form__input'>   
                    <div className="login-page__form__input__text">Log In</div>
                    <TextField style={{margin:'5px', width:'250px'}} id="username" label="Username" variant="outlined" onChange={this.handleChange}/>
                    <TextField style={{margin:'5px', width:'250px'}} id="password" label="Password" type="password" variant="outlined"  onChange={this.handleChange}/>
                    <Link to="/forgotPassword" style={{textDecoration:'none' , margin:'auto',color:"#00308F"}}><small>Forgot your password?</small></Link>
                    <div className="login-page__form__input__btn">
                        <PrimaryButton function={this.signIn} btnText="Log In"/>

                    </div>
                </div>
                <div style={{position:'absolute',bottom:0, right:0, padding:'10px'}}>
                    <small style={{cursor:'pointer'}} onClick={()=>{window.location.href = '/signUp'}}>Sign Up?</small>
                </div>
            </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };
  

  

export default connect(mapStateToProps, { setUser: setUser, showAlert:showAlert })(loginPage);


