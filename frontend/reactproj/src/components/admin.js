import React, { Component } from 'react';
import PrimaryButton from './buttons/primaryBtn';
import AdminCard from './adminCard.js';

import Button from '@mui/material/Button';
import { AppBar, Box, Card, Paper } from '@mui/material';

function addAdmin(){
    alert("hi");
}
function addInstructor(){

}
function addCorporateTrainee(){

}
function admin(){
       
        return (
                   <div className='tmp-content'>
                            <AdminCard sx={{padding:'50px'}}header = {"Create Admin Account"} buttonName = {"Add Admin"}/>
                            <AdminCard header = {"Create Instructor Account"} buttonName = {"Add Instructor"}/>
                            <AdminCard header = {"Create Trainee Account"} buttonName = {"Add Trainee"}/>
                    </div>
                );
    }


export default admin;
