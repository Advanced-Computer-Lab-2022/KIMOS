import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { flexbox, minHeight } from '@mui/system';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {AppBar,Grid,Grow,Container} from '@mui/material';
import useStyles from '../styles/styles.scss';

export default function TraineeViewMyCourse() {
    const [course,setCourse]=useState([]);
    const [value, setValue] = useState(3);
    var subTitleCount=1;

    useEffect(() => {
        axios.get("").then((course) => {
          setCourse(course.data);
        });
      }, [course]);



  return (
    <>
    <div style={{paddingTop:50,paddingLeft:150,backgroundColor:'#A30000',maxHeight:350,display:'flex',flexDirection:'column',rowGap:14}}>
      <h1 style={{color:'white'}}>Operating Systems</h1>

    {/* summary */}
      <div style={{maxWidth:600,lineHeight:1.8}}>
        <h4 style={{color:'white',fontWeight:"normal"}}>Start here to become an AWS Solutions Architect. Gain the skills and knowledge to design architectural solutions on AWS and prepare for your AWS Certified Solutions Architect - Associate exam.</h4>
      </div>

    {/* Total Hours */}
      <h4 style={{color:'black'}}>Total Hours: 12hrs</h4>

    {/* Instructor Name */}
      <h4 style={{color:'black'}}>Instructor: Hassan Soubra</h4>

    {/* Rating */}
      <Rating
         name="read-only" value={value} 
      />
    </div>

    {/* Preview Video */}
    <Grow in>
    <Container style={{maxWidth:800}}>
    
    <AppBar position="static" color="inherit" style={{paddingTop:20,marginTop:-150,display:"flex",alignItems:"center",rowGap:30,minHeight:400}}>
    <h1 >Preview</h1>
        <iframe Width="600" Height="250"
            src="https://www.youtube.com/embed/XXPBl20J22w" >
        </iframe>
    
    </AppBar>
    </Container>
    </Grow>
    

    <Container style={{display:"flex"}}>
     {/* subTitles */}
     <Grow in>
    <Container style={{maxWidth:800}}>
    
    <AppBar className="appBar3" position="static" color="inherit" style={{marginTop:50,paddingTop:20,display:"flex",alignItems:"start",paddingLeft:100}}>
        <h1 style={{paddingLeft:200}}>Subtitles</h1>
        <hr
            style={{marginTop:20,background:'#A30000',color:'#A30000',minWidth:500}}
        />

        <div style={{marginTop:20,display:"flex",justifyContent:"center",alignItems:"center",columnGap:140}}>
            <div style={{display:"flex",flexDirection:"column",rowGap:20,maxWidth:90,alignItems:"center"}}>
                <label style={{color:"#3E424B"}}>SUBTITLE</label>
                <label style={{fontSize:30,color:"#3E424B"}}>{subTitleCount++}</label>
            </div>

            <div style={{paddingTop:20,maxWidth:320,alignItems:"center",display:"flex",flexDirection:"column",rowGap:20}}>
                <label style={{color:"#A30000"}}>Kernal the OS</label>
                <label>Kernal is the core of the oparating system.It can't work without it.</label>

                <a style={{color:"#3E424B"}} href="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">Video</a>
                
            </div>
        </div>
        <hr
            style={{marginTop:20,background:'#A30000',color:'#A30000',minWidth:500}}
        />

        <div style={{marginTop:20,display:"flex",justifyContent:"center",alignItems:"center",columnGap:140}}>
            <div style={{display:"flex",flexDirection:"column",rowGap:20,maxWidth:90,alignItems:"center"}}>
            <label style={{color:"#3E424B"}}>SUBTITLE</label>
                <label style={{fontSize:30,color:"#3E424B"}}>{subTitleCount++}</label>
            </div>

            <div style={{paddingTop:20,maxWidth:320,alignItems:"center",display:"flex",flexDirection:"column",rowGap:20}}>
                <label style={{color:"#A30000"}}>Sceduling Algorithims</label>
                <label>There are many types of algorithims like FIFO,Round Robin and LCLS</label>
                
                <a style={{color:"#3E424B"}} href="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">Video</a>
            </div>
            
        </div>
        <hr
            style={{marginTop:20,background:'#A30000',color:'#A30000',minWidth:500}}
        />

        <div style={{marginTop:20,display:"flex",justifyContent:"center",alignItems:"center",columnGap:140}}>
            <div style={{display:"flex",flexDirection:"column",rowGap:20,maxWidth:90,alignItems:"center"}}>
            <label style={{color:"#3E424B"}}>SUBTITLE</label>
                <label style={{fontSize:30,color:"#3E424B"}}>{subTitleCount++}</label>
            </div>

            <div style={{paddingTop:20,maxWidth:320,alignItems:"center",display:"flex",flexDirection:"column",rowGap:20}}>
                <label style={{color:"#A30000"}}>Malware</label>
                <label>It's the malicious software and the problems that can happen</label>
                
                <a style={{color:"#3E424B"}} href="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">Video</a>
            </div>
        </div>
        <hr
            style={{marginTop:20,background:'#A30000',color:'#A30000',minWidth:500}}
        />

        <div style={{minHeight:50}}></div>
    
    </AppBar>
  </Container>
  </Grow>

    {/* Exercises */}
    <Grow in>
    <Container style={{maxWidth:400}}>
    
    <AppBar className="appBar4" position="static" color="inherit" style={{marginTop:50,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",rowGap:20,paddingTop:20}}>
       
        <h1>Exercises</h1>
        
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 1</Button>
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 2</Button>
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 3</Button>
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 4</Button>
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 5</Button>
        <Button variant="outlined" style={{color:'#A30000',borderColor:"#A30000"}}>Exercise 6</Button>
        <div></div>
    </AppBar>
  
    </Container>
    </Grow>

    </Container>


    <div style={{minHeight:50}}></div>
    
    
    </>
  )
}
