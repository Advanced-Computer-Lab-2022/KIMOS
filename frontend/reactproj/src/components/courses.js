import React, { Component } from 'react';
import CourseItem from './courseItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';


import tmpImg from '../assets/imgTmp.jpeg';

class courses extends Component {
    course = {
        'title':'Introduction to React',
        'price':'999',
        'rating':'4.8',
        'totalHours':'58',
        'discount':'0',
        'subjects':'CS',
        'instructors':'Marsafy',
        'subtitles':'i dont know',
        'exercise':'i dont know too lol',
        'img':tmpImg

    }
    state ={
        
        courses :[],
        priceRange: 500,
        ratingRange:[0,5]

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
        this.setState({courses:tmp})

    }
    componentDidMount(){
        this.addCourses();
    }

    getFilterComp = (filter, options)=>{
        return (
            <div className="filters__filter-by">
                <div className="filters__filter-by__title">{filter}</div>
                <div className="filters__filter-by__options">
                    {options.map((option, key)=>{
                        return (
                            <div key={key} className="filters__filter-by__options__option">
                                <FormControlLabel  control={<Checkbox  />} label={option} />
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
                            max={500}
                            />
                    </Box>
                </div>
            </div>

        )
    }
    updateRating = (value)=>{
        this.setState({ratingRange:value})
    }
    updateCourses = ()=>{
        var newCourses = [];
        this.state.courses.forEach((course)=>{
            if(course.price <= this.state.priceRange )
            {
                if(course.rating >= this.state.ratingRange[0] && course.rating <= this.state.ratingRange[1])
                    newCourses.push(course)
                else{
                    console.log(course.rating ,this.state.ratingRange[0] )
                }
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
                    {this.getFilterComp("Subjects",['Data science', 'AI','Security'])}
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

export default courses;