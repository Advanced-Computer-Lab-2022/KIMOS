import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';

 
export default function ShowCourse() {

    const[courseList,setCouseList]=useState([]);
    var i=1;
    //call itself whenever the page is refreshed
    useEffect(()=>{
        axios.get('http://localhost:5000/Instructor').then((allCourses)=>{
            setCouseList(allCourses.data);
        })
    },[courseList])

  return (
    <>
    <h2>My Courses</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Number</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList.map((course,key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {i++}
              </TableCell>
              <TableCell align="center" >{course.title}</TableCell>
              <TableCell align="center">
                <Button  variant="contained" style={{maxWidth:"150px",maxHeight:"30px",fontSize:"11px"}}>view</Button>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

