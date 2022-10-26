import React, { Component } from 'react';
import PrimaryButton from './buttons/primaryBtn';
import SecondaryButton from './buttons/secondaryBtn';
import SearchIcon from '@mui/icons-material/Search';
import CountrySelector from './countrySelector';
import { setCourses } from '../redux/actions/index';
import {connect} from 'react-redux';


const axios = require('axios');

var Navigation = require('react-router').Navigation;

class navbar extends Component {

 


    state = {
        searchContent:'',
        loading:false,
        courses:[]
    }
    changeInput = (event)=>{
        this.setState({[event.target.id]:event.target.value})
    }


    enterSearch = ()=>{
        //write the end point to get the results
        // this.addCourses();
        // window.location.href = '/courses'
        window.location.href = ('/courses/search?q='+ this.state.searchContent+'&page=1');
    }
    goHome = ()=>{
        window.location.href = '/'
    }
    searchBar = ()=>{
        return(
            <div className="search-bar">
                <input className="search-bar__input" type="text" placeholder="Explore our courses" id="searchContent" value={this.state.searchContent} onChange={(e)=>this.changeInput(e)}/>
                <form className="search-bar__btn">
                    <SearchIcon fontSize="large" onClick={this.enterSearch} />
                </form>
            </div>
        )
    }
    render() {
        return (
            <div className="navbar">
                <div className="title" onClick={this.goHome}>
                    KIMOS
                </div>

                <div className="options">


                    {this.searchBar()}
                </div>

                <div className="user-options">
                    <PrimaryButton function={this.exampleFunction} btnSize="medium" btnText="Log In"/>
                    <SecondaryButton function={this.exampleFunction} btnSize="medium" btnText="Sign Up"/>
                    <CountrySelector />

                </div>

            </div>
        );
    }
}




const mapStateToProps = (state) =>{
   
    return {
        courses: state.courses,
    };
  }
  
  
export default connect(mapStateToProps, {setCourses:setCourses})(navbar)
  