import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RefundRequest(props) {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [input,setInput]=useState('');
  
  const refundRequest = async () => {
    await axios.post('http://localhost:5000/login',{username:"individual",password:"individual123"})
  
    await axios.post(`http://localhost:5000/courses/refund?courseId=${props.courseId}`)
      .then((result) => {
              
      });
    };
  
    // useEffect(() => {
    //    refundRequest();
    // }, []);

  const handleClick = () => {
     if(input!=''){
      setOpenSuccess(true);
      props.close();
      props.feedback(true);
      refundRequest();
     }
     else{
      setOpenFailure(true);
     }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseNoReason = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailure(false);
  };

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:0}}>
      <div style={{display:"flex",flexDirection:"column",maxWidth:800,rowGap:20}}>
        <h1>Requesting a Course Refund</h1>

        <label>PLease submit the reason of your inconvenience to this course below:</label>

        <TextField multiline
          required
          value={input}
          onChange={(event)=>{setOpenSuccess(false);setOpenFailure(false);setInput(event.target.value)}}
          style={{width:380}} 
          ></TextField>

        <label style={{lineHeight:1.5}}>
          Most refunds are returned via the original payment method. If another person 
          (for example, a facilitator or instructor) purchased your course access from our
          website, please ask that individual to request the refund.
        </label>

        <label style={{color:"var(--primary-color)"}}>
          We will replay to you via email within 3 days from the moment you click 'REQUEST' below.
        </label>
        
        <h1>Reasons for Denial of Refund</h1>

        <label>Refund requests will not be honored in the following situations:</label>

        <ul style={{marginLeft:30,listStyle:"inside",lineHeight:1.5}}>
          <li>The request arrives after finishing more than 50% of the course.</li>
          <li>The request comes from a person who did not purchase access from our website.</li>
          <li>The person requesting the refund has already completed the course.</li>
          <li style={{lineHeight:1.5}}>The individual has submitted refund requests for multiple courses over an extended time period (abusing the refund policy).</li>
          <li>The request comes from a bot, a hacking attempt, or another fraudulent source.</li>
        </ul>

        <Stack style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Button variant="contained" style={{width:130,marginBottom:30}} onClick={handleClick}>
            Request
          </Button>
          {input !== '' ? 
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your request is sent successfully!
            </Alert>
          </Snackbar>:
          <Snackbar  open={openFailure} autoHideDuration={6000} onClose={handleCloseNoReason}>
          <Alert onClose={handleCloseNoReason} severity="error" sx={{ width: '100%' }}>
            Please enter a reason for your inconvenience!
          </Alert>
        </Snackbar>
          }
        </Stack>
      </div>
    </div>
  )
}
