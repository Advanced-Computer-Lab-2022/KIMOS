import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Stack} from '@mui/material';
import { useEffect } from 'react';

const paymentLoading = () => {


    useEffect(()=>{
        axios.post('http://localhost:5000/users/invoice',{courseId:URLSearchParams(window.location.search).get("courseId")})
        .then(()=>{
            window.location.href = 'http://localhost:3000';
        })
        .catch((e)=>{
            console.log(e);
        })
    })

    return (  
        <Stack sx={{display:"flex",justifyContent:"center",alignItems: "center"}} spacing={2}>
            <CircularProgress />
            <p>Processing your payment</p>
        </Stack>
    );
}
 
export default paymentLoading;