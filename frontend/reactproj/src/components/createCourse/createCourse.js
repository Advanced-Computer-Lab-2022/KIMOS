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
        totalHours:'',
        discout:'',
        subject:'',
        instructor:"635387b65b29f183de6e32d6",
        exercises:[]
    })

    //we use axios to send date from frontend to backend
    const createCourse= ()=>{
        axios.post('http://localhost:5000/Instructor',course).then(()=>{
          window.location.reload(false);
        })
    }
    
  return (
    <>
    <h2>Create A New Course</h2>

      <TextField required id="outlined-basic" label="Title" variant="outlined" value={course.title} onChange={(event)=>{setCourse({...course,title:event.target.value})}}/>
      <TextField required id="outlined-basic2" label="Subject" variant="outlined" value={course.subject} onChange={(event)=>{setCourse({...course,subject:event.target.value})}}/>
      {/* <Button variant="contained" style={{minWidth:"10px",maxWidth:"20px",minHeight:"20px",maxHeight:"10px",fontSize:"40px",backgroundColor:"white",color:"blue"}} >+</Button> */}
      <TextField required id="outlined-basic3" label="SubTitle" variant="outlined" value={course.subtitle} onChange={(event)=>{setCourse({...course,subtitle:event.target.value})}}/>
      <TextField required id="outlined-basic5" label="Total Hours" variant="outlined" value={course.totalHours} onChange={(event)=>{setCourse({...course,totalHours:event.target.value})}}/>
      <TextField required id="outlined-basic4" label="Price" variant="outlined" value={course.price} onChange={(event)=>{setCourse({...course,price:event.target.value})}}/>
      <TextField required id="outlined-basic6" label="Summary" variant="outlined" value={course.summary} onChange={(event)=>{setCourse({...course,summary:event.target.value})}}/>

      <Button variant="contained" style={{minWidth:"120px"}} onClick={createCourse}>Add</Button> 
    
    </>
  );
}
