import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Create() {
    const [course,setCourse]=useState({
        title:'',
        subtitle:'',
        price:'',
        summary:'',
        rating:0,
        totalHours:0,
        discout:0,
        subjects:[],
        instructors:[],
        exercises:[]
    })

    //we use axios to send date from frontend to backend
    const createCourse= async ()=>{
        
        await axios.post('http://localhost:5000/Instructor',course,{headers:{"Access-Control-Allow-Origin": "*"}})
    }

  return (
    <>
    <h2>Create A New Course</h2>

      <TextField id="outlined-basic"  label="Title" variant="outlined" value={course.title} onChange={(event)=>{setCourse({...course,title:event.target.value})}}/>
      <TextField id="outlined-basic2" label="SubTitle" variant="outlined" value={course.subtitle} onChange={(event)=>{setCourse({...course,subtitle:event.target.value})}}/>
      <TextField id="outlined-basic3" label="Price" variant="outlined" value={course.price} onChange={(event)=>{setCourse({...course,price:event.target.value})}}/>
      <TextField id="outlined-basic4" label="Summary" variant="outlined" value={course.summary} onChange={(event)=>{setCourse({...course,summary:event.target.value})}}/>

      <Button variant="contained" style={{minWidth:"120px"}} onClick={createCourse}>Add</Button> 
    
    </>
  );
}
