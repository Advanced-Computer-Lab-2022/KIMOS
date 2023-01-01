import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Visibility } from '@mui/icons-material/Visibility';
import axios from 'axios';
import { ListItem } from '@mui/material';

var x=0;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function Row(props) {
    const { row } = props;
    const {display}=props
    const [open, setOpen] = React.useState(false);

    const [myInvoices, setMyInvoices] = useState([]);

  const getInvoices = async () => {
    await axios.post('http://localhost:5000/login',{username:"erenYeager",password:"instructor123"})

    await axios
      .get('http://localhost:5000/users/invoices/instructor')
        .then((result) => {
        console.log(result.data.payload);
        setMyInvoices(result.data.payload);
      });
  };

  useEffect(() => {
    getInvoices();
  }, []);

    const convertDateToString=(date)=>{
        switch(date){
          case 1:return "January";break;
          case 2:return "Febraury";break;
          case 3:return "March";break;
          case 4:return "April";break;
          case 5:return "May";break;
          case 6:return "June";break;
          case 7:return "July";break;
          case 8:return "August";break;
          case 9:return "September";break;
          case 10:return "October";break;
          case 11:return "November";break;
          case 12:return "December";break;
          default: return 'N/A'
        }
    }
  
    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" style={{paddingLeft:150}}>{convertDateToString(new Date(row.date).getMonth()+1)} {new Date(row.date).getFullYear()}</TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Course</TableCell>
                      <TableCell align="center">Amount</TableCell>
                      <TableCell align="center">Item Price</TableCell>
                      <TableCell align="center">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                  {myInvoices.length>0 && myInvoices.map((row,index) => (
                    <>
                      {(new Date(row.date).getMonth()+1)===display && 
                      <>
                      <TableRow key={row.date}>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.course}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.itemPrice}</TableCell>
                        <TableCell align="center">{Math.round(parseInt(row.itemPrice)*parseInt(row.amount))}</TableCell>
                      </TableRow>
                       <div hidden="hidden">{x+=Math.round(parseInt(row.itemPrice)*parseInt(row.amount))}</div>
                       </>
                    }
                    </>))}
                     
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell> 
                        <TableCell align="center"></TableCell> 
                        <TableCell align="center">= {x}</TableCell>
                      </TableRow>
                      <div hidden="hidden">{x=0}</div>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
export default function MoneyOwedPerMonth() {
  const [myInvoices, setMyInvoices] = useState([]);
  var oldKey=0;

  const getInvoices = async () => {


    await axios
      .get('http://localhost:5000/users/invoices/instructor')
        .then((result) => {
        console.log(result.data.payload);
        setMyInvoices(result.data.payload);
      });
  };

  useEffect(() => {
    getInvoices();
  }, []);


  return (
    <div>
    <h1 style={{marginLeft:20,marginTop:30,marginBottom:30,color:"var(--primary-color)"}}>My Profit</h1>
    <TableContainer component={Paper} style={{width:700,margin:"auto"}}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:"black"}}>
          <TableRow>
            <TableCell />
            <TableCell style={{color:"white",paddingLeft:170}}>Month</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {myInvoices.length>0 && myInvoices.map((row,index) => (
              <>
            {new Date(row.date).getMonth()+1!==oldKey && <Row display={new Date(row.date).getMonth()+1} key={new Date(row.date).getMonth()+1} row={row} />}
            <div hidden="hidden">{oldKey=new Date(row.date).getMonth()+1}</div>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{paddingTop:30}}></div>
    </div>
    
  )
}
