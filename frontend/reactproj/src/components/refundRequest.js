import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function RefundRequest() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:30}}>
      <div style={{display:"flex",flexDirection:"column",maxWidth:800,rowGap:20}}>
        <h1>Requesting a Course Refund</h1>

        <label style={{lineHeight:1.5}}>
          If you are unhappy with an online course you have purchased from our website, 
          you can request a refund if you have attended less than 50% of the course.
        </label>

        <label>PLease submit the reason of your inconvenience to this course below:</label>

        <TextField multiline required style={{width:450}}></TextField>
{/*
        <ul style={{marginLeft:30,listStyle:"inside",lineHeight:1.8}}>
          <div style={{display:"flex",columnGap:20}}>
            <li>Your name</li>
            <input style={{width:200,height:27,outline:"none",color:"var(--primary-color)"}}/>
          </div>

          <div style={{display:"flex",columnGap:20}}>
            <li>Your email address</li>
            <input style={{width:200,height:27,outline:"none",color:"var(--primary-color)"}}/>
          </div>

          <div style={{display:"flex",columnGap:20}}>
            <li>Your course title</li>
            <input style={{width:200,height:27,outline:"none",color:"var(--primary-color)"}}/>
          </div>

          <div style={{display:"flex",columnGap:20}}>
            <li>Your course subject</li>
            <input style={{width:200,height:27,outline:"none",color:"var(--primary-color)"}}/>
          </div>

          <div style={{display:"flex",columnGap:20}}>
            <li>The method of payment you used for the initial purchase</li>
            <input style={{width:200,height:27,outline:"none",color:"var(--primary-color)"}}/>
          </div>
          
        </ul>
  */}

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
          <Button variant="contained" style={{width:150,marginBottom:30}} onClick={handleClick}>
            Request
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your request is sent successfully!!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>
  )
}
