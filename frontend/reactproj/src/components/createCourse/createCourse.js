import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

export default function Create() {
  var subtitleCount=1;
    const [course,setCourse]=useState({
        title:'',
        subtitles:[],
        price:'',
        summary:'',
        rating:0,
        totalHours:'',
        discout:'',
        subject:'',
        instructor:"635387b65b29f183de6e32d6",
        exercises:[]
    })

    const [subtitleList,setSubtitle]=useState([
      {subtitle:""}
    ])

    console.log(subtitleList);

    //we use axios to send date from frontend to backend
    const createCourse= ()=>{
        axios.post('http://localhost:3000/Instructor',course).then(()=>{
          window.location.reload(false);
        })
    }

    const addSubTitle=()=>{
      setSubtitle([...subtitleList,{subtitle:""}])
    }

    const handleChange=(e,index)=>{
      const{name,value}=e.target;
      const list=[...subtitleList];
      list[index][name]=value;
      course.subtitles[index]=value;
      setSubtitle(list);
    }
    
  return (
    <>
    <h2>Create A New Course</h2>

      <TextField required id="outlined-basic" label="Title" variant="outlined" value={course.title} onChange={(event)=>{setCourse({...course,title:event.target.value})}}/>
      <TextField required id="outlined-basic2" label="Subject" variant="outlined" value={course.subject} onChange={(event)=>{setCourse({...course,subject:event.target.value})}}/>

  {/* subtitles */}
      {subtitleList.map((singleSubtitle,index)=>(
        <div key={index}>
          <TextField required name="subtitle" id="outlined-basic3" label="SubTitle" variant="outlined" value={singleSubtitle.subtitle} onChange={(e)=>handleChange(e,index)}  />
          {subtitleList.length-1 === index &&
          ( <AddCircleOutlineIcon variant="contained" style={{minWidth:"50px",marginTop:"15px"}} onClick={addSubTitle}></AddCircleOutlineIcon>)
          }
        </div>
      ))}
      
      <TextField required id="outlined-basic5" label="Total Hours" variant="outlined" value={course.totalHours} onChange={(event)=>{setCourse({...course,totalHours:event.target.value})}}/>
      <TextField required id="outlined-basic4" label="Price" variant="outlined" value={course.price} onChange={(event)=>{setCourse({...course,price:event.target.value})}}/>

      <TextField multiline required id="outlined-basic6" InputProps={{ sx: { minHeight: 120,minWidth:225}}}  label="Summary" variant="outlined" value={course.summary} onChange={(event)=>{setCourse({...course,summary:event.target.value})}}/>


      <Button variant="contained" style={{minWidth:"120px",marginLeft:"50px"}} onClick={createCourse}>Add</Button> 
    
    </>
  );
}
