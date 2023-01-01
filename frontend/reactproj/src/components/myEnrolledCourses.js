import React,{useState,useEffect} from 'react';
import {Container,AppBar,Grow,Grid} from '@mui/material';
import courseImage from '../assets/courseImage.png';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Loading from './loadingPage';

import axios from 'axios';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  border:"solid",
  borderColor:"#F5F5F5",
  borderWidth:"thin",
  minWidth:300,
  maxWidth:300,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1aff9c' : '#FFFFFF',
  },
}));


export default function MyEnrolledCourses() {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  const getCourses = async () => {
    setLoading(true)
    await axios
      .get('http://localhost:5000/courses/register')
        .then((result) => {
          setLoading(false)
        var results = [];
        result.data.payload.courses.forEach(course=>{
          if(course !== null) results.push(course)
        })
        console.log("courses")
        console.log(results);
        setMyCourses(results);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);


  return (
    <div>
        {loading && <Loading/>}
        <div style={{display:"flex",marginLeft:20,marginTop:20}}>
            <h1 style={{color:"var(--primary-color)"}}>MY COURSES</h1>
        </div>
      

        <Grow in>
            <Container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <AppBar className="appBarCourses" position="static" color="inherit">

                {myCourses.length>0 && myCourses.map((course) => {
                    return(
                        <>
                        <div onClick={()=>{window.location.href = 'myCourses/'+course['_id']}} class="image" style={{display:"flex",columnGap:80,justifyContent:"flex-start",alignItems:"flex-start",marginTop:20,marginBottom:20,marginLeft:30}}>
                            <div>
                                <img  width="250" height="150" src={courseImage} alt="course img"/>
                            </div>

                            <div style={{display:"flex",flexDirection:"column",rowGap:20}}>
                                <label style={{fontWeight:100,fontSize:"12"}}>{course.subject.name}</label>
                                <label style={{fontWeight:600,fontSize:"18"}}>{course.title}</label>
                                <Box style={{display:"flex",flexDirection:"column",marginTop:20,rowGap:7}}>
                                    <BorderLinearProgress variant="determinate" value={Math.ceil(parseInt(course.progress || 0)) *100}/>
                                    <label>{Math.ceil(parseInt(course.progress|| 0)) *100}% complete</label>
                                </Box>
                                
                            </div>
                        </div>
                        <hr style={{color:"#F5F5F5"}}></hr>
                    </>
                    )
                })}

                </AppBar>
            </Container>
        </Grow>
    </div>
  )
}
