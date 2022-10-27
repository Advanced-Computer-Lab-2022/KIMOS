import { useEffect, useState } from "react";

import Container from '@mui/material/Container';
import { shadows, Stack } from "@mui/system";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const courseDetials = ({id}) => {

    const [course,setCourse] = useState(null)

    useEffect(()=>{
        //console.log(id)
        const fetchCourse = async () => {
            const uri = '/course/viewCourse/'+id
            const response = await fetch(uri)
            const json = await response.json()
            console.log(json)

            if(response.ok){
                setCourse(json)
            }
        }
        fetchCourse()
    },[])

    return ( 
        
        <Box    sx={{maxwidth: 0.1 ,textOverflow:"clip"}} marginY={"auto"}>
            <Stack sx={{maxwidth: 0.5}} direction="column-reverse" justifyContent="space-evenly" alignItems="center" spacing={20}>
                {course && 
                <div>
                    <Item ><strong>Title : </strong>{course.title}</Item>
                    <Item ><strong>Price : </strong>{course.price}</Item>
                    <Item ><strong>Discount : </strong>{course.discount}</Item>
                    <Item ><strong>Total Hours : </strong>{course.totalHours}</Item>
                    <Item ><strong>Subtitles : </strong>{course.subtitles}</Item>
                </div>
                }
            </Stack>
        </Box>
       
     );
}
 
export default courseDetials;