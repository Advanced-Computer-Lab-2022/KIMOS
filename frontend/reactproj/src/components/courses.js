import React, { Component } from 'react';
import CourseItem from './courseItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import Slider from '@mui/material/Slider';
import { connect } from 'react-redux';


import axios from 'axios';

class courses extends Component {
        //main courses are the ones we got on the post response. Courses are them but after the filters
        state ={
            mainCourses:[],
            courses :[],
            priceRange: 10000,
            ratingRange:[0,5],
            subjects:[],
            filterFlag:false,
            subjectsFilter:{}
    
        }
    componentDidMount(){
        this.getSubjects();
        this.submitSearch(this.getQueryVariable());
      }

    getSubjects = async ()=>{


        try {
            const res = await axios.get('http://localhost:3000/courses/subjects',{headers:{"Access-Control-Allow-Origin": "*"}});

            this.setState({subjects:res.data.subjects}, ()=>{

                this.state.subjects.forEach((subject)=>{
                    this.state.subjectsFilter[subject] = false;
                  
                })
            })

        } catch (e) {

        }
    }
    getQueryVariable()
            {
                var query = window.location.href;
                var keyword = query.split('?')[1];
                keyword = keyword.slice(2);
                return keyword;
            }

    submitSearch = async(keyword)=>{

        const body = { 'keyword': keyword };

        try {
            const res = await axios.post('http://localhost:3000/courses/findCourse',body,{headers:{"Access-Control-Allow-Origin": "*"}});

            this.setState({courses:res.data, mainCourses:res.data})

        } catch (e) {

        }
    }



    
    filterExists = (filters)=>{

        var flag = false;
        Object.keys(filters).forEach((key)=>{
            if(filters[key]===true){
                flag = true;
            }
        })
        return flag
    }
    handleFilterChange = (option)=>{
        var newFlags = {...this.state.subjectsFilter};
        if(newFlags[option]){
            newFlags[option] = false;
        }
        else{
            newFlags[option] = true;
        }
        var flag = this.filterExists(newFlags);
        this.setState({subjectsFilter:newFlags}, ()=>{
            this.setState({filterFlag:flag}, ()=>{
                this.updateCourses();
            })

        });
    }
    getFilterComp = (filter, options)=>{
        return (
            <div className="filters__filter-by">
                <div className="filters__filter-by__title">{filter}</div>
                <div className="filters__filter-by__options">
                    {options.map((option, key)=>{
                        return (
                            <div key={key} className="filters__filter-by__options__option">
                                <FormControlLabel  control={<Checkbox checked={this.state.subjectsFilter.option} onChange={()=>this.handleFilterChange(option)} />} label={option} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    handleSliderChange = (value)=>{
        this.setState({priceRange:value})
    }
    getPriceSlider = ()=>{
        return( 
            <div className="filters__filter-by">
                <div className="filters__filter-by__title">Price</div>
                <div className="filters__filter-by__options">
                    <Box sx={{ width: '100%', marginLeft:'10px' }}>
                            <Slider
                            getAriaLabel={() => 'Price range'}
                            value={this.state.priceRange}
                            valueLabelFormat = {(value)=>{return (value===0)? 'Free':value+'$'}}
                            onChange={(event, value)=> this.handleSliderChange(value)}
                            onChangeCommitted = {this.updateCourses}
                            valueLabelDisplay="auto"
                            max={10000}
                            />
                    </Box>
                </div>
            </div>

        )
    }
    updateRating = (value)=>{
        this.setState({ratingRange:value})
    }

    removeCourse =(courses, course)=>{
        var newArr = [];
        courses.forEach((courseItem)=>{

            if(courseItem.title !== course)
                newArr.push(courseItem);
        })

        return newArr;
    }
    updateCourses = ()=>{
        var newCourses = [];


        if(this.state.filterFlag)
            this.state.mainCourses.forEach((course)=>{
                if(this.state.subjectsFilter[course.subject] === true)
                {
                    newCourses.push(course)
                }

            })
        else
            newCourses = [...this.state.mainCourses]
            

        newCourses.forEach((course)=>{
            if(course.price > this.state.priceRange )
            {
                newCourses = this.removeCourse(newCourses, course.title);
            }
        })
        newCourses.forEach((course)=>{
            if(!(course.rating >= this.state.ratingRange[0] && course.rating <= this.state.ratingRange[1]))
            {
                    newCourses = this.removeCourse(newCourses, course.title);
            }
        })







        this.setState({courses:newCourses})
    }
    getRatingSlider = ()=>{
        return( 
            <div className="filters__filter-by">
                <div className="filters__filter-by__title">Rating</div>
                <div className="filters__filter-by__options">
                    <Box sx={{ width: '100%', marginLeft:'10px' }}>
                        <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={this.state.ratingRange}
                        onChange={(event, value)=>{this.updateRating(value)}}
                        onChangeCommitted = {this.updateCourses}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value)=> {return value}}
                        max={5}

                        />
                    </Box>
                </div>
            </div>

        )
    }
    
    render() {
        return (
            <div className="courses-container">

                <div className="filters">
                    {this.getFilterComp("Subjects", this.state.subjects)}
                    {this.getPriceSlider()}
                    {this.getRatingSlider()}
                </div>

                <div className="courses">
                    {this.state.courses.map((course,index)=>{
                        return ( <CourseItem key={index} course={course}/> )
                    })}
                    {this.state.courses.length === 0 && (
                        <div className="courses__none">No Results were Found</div>
                    )}
                </div>

               
            </div>
        );
    }
}





  
export default courses
  