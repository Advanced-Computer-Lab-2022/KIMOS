import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

 

export default function ShowCourse() {

    const[courseList,setCouseList]=useState([]);
    var i=1;
    //call itself whenever the page is refreshed
    useEffect(()=>{
        axios.get('http://localhost:5000/Instructor').then((allCourses)=>{
            console.log(allCourses.data);
        })
    },[])

  return (
    <>
    <h2>My Courses</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell align="left">Title</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList.map((course,key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i++}
              </TableCell>
              <TableCell align="left" >{course.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

