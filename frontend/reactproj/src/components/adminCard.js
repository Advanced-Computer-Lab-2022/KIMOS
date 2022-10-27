import { AppBar, Box, Button, Card, Paper, TextField, Toolbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { display } from '@mui/system';
import React, { Component } from 'react';
import primaryBtn from './buttons/primaryBtn';
import PrimaryButton from './buttons/primaryBtn';

function adminCard(props) {
        return(
                    <Box  sx={{
                                width: 400,
                                height:350,
                                bgcolor: 'background.paper',
                                boxShadow: 8,
                                borderRadius: 4,
                                p: 2,
                                position: 'relative'
                                 }}>
                         <h2 style={{display:'flex', justifyContent: 'center', fontFamily:'arial,sans-sarif', color:'#1976d2', fontSize:'22px'}}>{props.header}</h2>
                         <Toolbar sx={{display:'flex',
                                       marginTop:'5%',
                                       flexDirection: 'column',
                                       position:'abolute'}}>
                       
                            <TextField 
                                sx={{display:'flex', justifyContent:'center', marginTop:'8%'}}
                                required  
                                label="Username"  
                                size= "medium"  
                                variant="outlined" />

                            <TextField 
                                sx={{display:'flex', justifyContent:'center', marginTop:'10%'}}
                                required 
                                label="Password"  
                                size= "medium"  
                                variant="outlined" />
                            <Button size="medium" sx={{ width:170, height:38, marginTop:'22%', marginLeft:'65%',}}variant="contained">{props.buttonName}</Button>                           
                             {/* <PrimaryButton function={props.addAdmin} btnSize="medium" btnText="Add Admin"/>
                            <PrimaryButton function={props.addInstructor} btnSize="small" btnText="Add Instructor"/>
                            <PrimaryButton function={props.addCorporateTrainee} btnSize="400 px" btnText="Add Corporate Trainee"/> */}
                        </Toolbar>
                    </Box>
                    
                   
        );
    }
export default adminCard;

