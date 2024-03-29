import React, { Component ,useState,useEffect} from 'react';
import student1 from '../assets/student1.png';
import student2 from '../assets/student2.png';
import student3 from '../assets/student3.png';
import PrimaryBtn from './buttons/primaryBtn';
import Rating from '@mui/material/Rating';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import reactCourse from '../assets/react.png';
import dataScienceCourse from '../assets/dataScience.png';
import fullStackCourse from '../assets/fullStack.png';
import pythonCourse from '../assets/python.png';
import aiCourse from '../assets/ai.png';
import javaCourse from '../assets/java.png';
import Loading from './loadingPage';
import {Container,AppBar,Grow,Grid} from '@mui/material';
import axios from 'axios';

export default function PopularCourses() {
    const [popularCourses, setPopularCourses] = useState([]);
    const [loading, setLoading] = useState(true);


  const getPopularCourses = async () => {
    setLoading(true);
    await axios
      .get('http://localhost:5000/courses/popular')
        .then((result) => {
        console.log(result.data.payload.returnCourses);
        setLoading(false);
        setPopularCourses(result.data.payload.returnCourses);
      });
  };

  useEffect(() => {
    getPopularCourses();
  }, []);

    const slideLeft=()=>{
        var slider=document.getElementById('slider');
        slider.scrollLeft-=210;
    }

    const slideRight=()=>{
        var slider=document.getElementById('slider');
        slider.scrollLeft+=210;
    }
    const showTitle=()=>{
        var flag = false;
        if(window.location.href.indexOf('topCourses') > -1){
            flag = true
        }
        return flag;
    }

  return (
    <div style={{position:'relative',display:"flex",justifyContent:"center",alignItems:"center",columnGap:5,  width:'100%'}}>
        {loading && <Loading/>}
        <div className="arrowLeft" onClick={slideLeft}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
        </div> 
        
        {showTitle() && <div style={{
            position:'absolute',
            left:'20px',
            top:'20px',
            fontSize:'30px',
            fontWeight:'bolder',
            color:'var(--primary-color)'
        }}>Most Popular Courses</div>}
        
        <Grow in>
            <Container>
                <AppBar className="appBarX" position="static" color="inherit">
                    <div id="slider" className="homeland__section section_3__allPopular">
                        {popularCourses.length>0 && popularCourses.map((course) => (
                            <div className="homeland__section section_3__allPopular__popularDiv" onClick={()=>{
                                const url = '/courses/'+course['_id']
                                window.open(
                                    url,
                                    '_blank' // <- This is what makes it open in a new window.
                                  );
                            }}>
                                <div class="hovering">
                                    <img className="homeland__section section_3__allPopular__popularDiv__image" src={dataScienceCourse} alt="course img"/>
                                </div>
                                <label className="homeland__section section_3__allPopular__popularDiv__title">{course.title}</label>
                                <label className="homeland__section section_3__allPopular__popularDiv__instructor">{course.instructor}</label>
                                <Rating style={{marginLeft:-5}} name="half-rating-read" defaultValue={course.rating.value} precision={0.5} readOnly />
                                <label className="homeland__section section_3__allPopular__popularDiv__price">{course.price}</label>
                            </div>
                        ))
                        }

                    </div>

                </AppBar>
            </Container>
        </Grow>

    <div className="arrowRight" onClick={slideRight}>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
    </div>
    
</div>
  )
}
