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

    course = {
        'title':'Introduction to React',
        'price':'999',
        'rating':'4.8',
        'totalHours':'58',
        'discount':'0',
        'subjects':'CS',
        'instructors':'Marsafy',
        'subtitles':'i dont know',
        'exercise':'i dont know too lol'
    }
addCourses = ()=>{
        var tmp = [];
        const minP = 1;
        const maxP = 500;

        const minR = 0;
        const maxR = 5;

        for(let i = 0; i < 15; i++){
            var tmpCourse = {...this.course};
             var price = Math.ceil (minP + Math.random() * (maxP - minP));
             var rating =Math.ceil( minR + Math.random() * (maxR - minR));

            tmpCourse['price'] = price;
            tmpCourse['rating'] = rating;

            tmp.push(tmpCourse);
        }
        this.setState({courses:tmp}, ()=>{
            this.setState({searchContent:''})
            this.props.selectCourses(tmp);
            // this.props.setCourses(tmp); 
            // this.transitionTo('foo');
    //   window.location.href = '/courses'

        });
    }


    state = {
        searchContent:'',
        loading:false,
        courses:[]
    }
    changeInput = (event)=>{
        this.setState({[event.target.id]:event.target.value})
    }

    submitGet = async()=>{


        try {
            const res = await axios.get('http://localhost:3000/courses', { params: { keyword: this.state.searchContent } });

        } catch (e) {
            console.log(e);
        }
    }
    enterSearch = ()=>{
        //write the end point to get the results
        // this.addCourses();
        // window.location.href = '/courses'
        window.location.href = ('/courses/search?q='+ this.state.searchContent);
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
  