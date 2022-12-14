import React from 'react'
import {Container,AppBar,Grow,Grid} from '@mui/material';
import courseImage from '../assets/courseImage.png';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

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


export default function myEnrolledCourses() {
  return (
    <div>
        <div style={{display:"flex",justifyContent:"center",marginTop:20}}>
            <h1>MY COURSES</h1>
        </div>
      

        <Grow in>
            <Container>
                <AppBar className="appBarCourses" position="static" color="inherit">
                    <div class="image" style={{display:"flex",columnGap:80,justifyContent:"flex-start",alignItems:"flex-start",marginTop:20,marginBottom:20,marginLeft:30}}>
                        <div>
                            <img  width="250" height="150" src={courseImage}/>
                        </div>

                        <div style={{display:"flex",flexDirection:"column",rowGap:20}}>
                            <label style={{fontWeight:100,fontSize:"12"}}>Back-End Development</label>
                            <label style={{fontWeight:600,fontSize:"18"}}>Building Web Applications using PHP & MYSQL</label>
                            <Box style={{display:"flex",flexDirection:"column",marginTop:20,rowGap:7}}>
                                <BorderLinearProgress variant="determinate" value={100}/>
                                <label>100% complete</label>
                            </Box>
                            
                        </div>
                    </div>
                    <hr style={{color:"#F5F5F5"}}></hr>

                    {/* */}
                    <div class="image" style={{display:"flex",columnGap:80,justifyContent:"flex-start",alignItems:"flex-start",marginTop:20,marginBottom:20,marginLeft:30}}>
                        <div>
                            <img width="250" height="150" src={courseImage}/>
                        </div>

                        <div style={{display:"flex",flexDirection:"column",rowGap:20}}>
                            <label style={{fontWeight:100,fontSize:"12"}}>MERN Stack</label>
                            <label style={{fontWeight:600,fontSize:"18"}}>Introduction to mongoDB</label>
                            <Box style={{display:"flex",flexDirection:"column",marginTop:20,rowGap:7}}>
                                <BorderLinearProgress variant="determinate" value={60}/>
                                <label>60% complete</label>
                            </Box>
                            
                        </div>
                    </div>
                    <hr style={{color:"#F5F5F5"}}></hr>

                     {/* */}
                     <div class="image" style={{display:"flex",columnGap:80,justifyContent:"flex-start",alignItems:"flex-start",marginTop:20,marginBottom:20,marginLeft:30}}>
                        <div>
                            <img width="250" height="150" src={courseImage}/>
                        </div>

                        <div style={{display:"flex",flexDirection:"column",rowGap:20}}>
                            <label style={{fontWeight:100,fontSize:"12"}}>MERN Stack</label>
                            <label style={{fontWeight:600,fontSize:"18"}}>Introduction to React</label>
                            <Box style={{display:"flex",flexDirection:"column",marginTop:20,rowGap:7}}>
                                <BorderLinearProgress variant="determinate" value={0}/>
                                <label>0% complete</label>
                            </Box>
                            
                        </div>
                    </div>
                    <hr style={{color:"#F5F5F5"}}></hr>
                </AppBar>
            </Container>
        </Grow>
    </div>
  )
}
