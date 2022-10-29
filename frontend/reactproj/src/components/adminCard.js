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
import React from 'react';

function adminCard(props) {
  return (
    <Box
      sx={{
        width: 400,
        height: 380,
        bgcolor: 'background.paper',
        boxShadow: 8,
        borderRadius: 4,
        p: 2,
        position: 'relative'
      }}>
      <h2
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'arial,sans-sarif',
          color: '#1976d2',
          fontSize: '22px'
        }}>
        {props.header}
      </h2>
      <Toolbar
        sx={{ display: 'flex', marginTop: '5%', flexDirection: 'column', position: 'abolute' }}>
        <FormControl sx={{ width: 225 }}>
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
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '8%' }}
          required
          id="Username"
          label="Username"
          size="medium"
          variant="outlined"
          onChange={props.functionOnChange}
        />

        <TextField
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}
          required
          id="Password"
          label="Password"
          size="medium"
          variant="outlined"
          onChange={props.functionOnChange}
        />
        <Button
          size="medium"
          sx={{ width: 170, height: 50, marginTop: '22%', marginLeft: '65%' }}
          variant="contained"
          onClick={props.functionOnClick}>
          {props.buttonName}
        </Button>
        {/* <PrimaryButton function={props.addAdmin} btnSize="medium" btnText="Add Admin"/>
                            <PrimaryButton function={props.addInstructor} btnSize="small" btnText="Add Instructor"/>
                            <PrimaryButton function={props.addCorporateTrainee} btnSize="400 px" btnText="Add Corporate Trainee"/> */}
      </Toolbar>
    </Box>
  );
}
export default adminCard;
