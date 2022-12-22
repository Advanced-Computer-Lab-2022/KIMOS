import {
  Box,
  Button,
  TextField,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import PrimaryButton from './buttons/primaryBtn';

import React from 'react';

function adminCard(props) {
  return (
    <Box
      sx={{
        width: '30%',
        height: '50%',
        
        bgcolor: 'background.paper',
        border:'1px solid var(--primary-color)',
        borderRadius: 5,
        p: 2,
        position: 'relative'
      }}>
      <h2
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--primary-color)',
          fontSize: '22px'
        }}>
        {props.header}
      </h2>
      <Toolbar
        sx={{height:'100%' ,display: 'flex', marginTop: '2%', flexDirection: 'column', position: 'abolute', justifyContent:'center' }}>
        <FormControl sx={{ width: 225,}}>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ height: 35 }}
            value={props.selectedItem}
            label="User Type"
            onChange={props.handleItemChange}>
            <MenuItem value={'Adminstrator'}>Adminstrator</MenuItem>
            <MenuItem value={'Instructor'}>Instructor</MenuItem>
            <MenuItem value={'Corporate Trainee'}>Corporate Trainee</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}
          required
          id="Username"
          label="Username"
          size="medium"
          variant="outlined"
          onChange={props.functionOnChange}
        />

        <TextField
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' , marginBottom: '15px' }}
          required
          id="Password"
          label="Password"
          size="medium"
          variant="outlined"
          onChange={props.functionOnChange}
        />

        <PrimaryButton function={props.functionOnClick} btnSize="medium" btnText={props.buttonName}/>
        {/* <PrimaryButton function={props.addAdmin} btnSize="medium" btnText="Add Admin"/>
                            <PrimaryButton function={props.addInstructor} btnSize="small" btnText="Add Instructor"/>
                            <PrimaryButton function={props.addCorporateTrainee} btnSize="400 px" btnText="Add Corporate Trainee"/> */}
      </Toolbar>
    </Box>
  );
}
export default adminCard;
