import React from 'react';
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

function createData(month) {
    return {
      month,
      history: [
        {
          date: '2020-01-05',
          course: '11091700',
          amount: 3,
          price:2500
        },
        {
          date: '2020-01-02',
          course: 'Anonymous',
          amount: 1,
          price:2500
        },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
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
          <TableCell component="th" scope="row" style={{paddingLeft:150}}>{row.month}</TableCell>
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
                    {row.history.map((historyRow) => (
                        <>
                      <TableRow key={historyRow.date}>
                        <TableCell align="center">{historyRow.date}</TableCell>
                        <TableCell align="center">{historyRow.course}</TableCell>
                        <TableCell align="center">{historyRow.amount}</TableCell>
                        <TableCell align="center">{historyRow.price}</TableCell>
                        <TableCell align="center">{Math.round(historyRow.price*historyRow.amount)}</TableCell>
                      </TableRow>
                      <div hidden="hidden">{x+=Math.round(historyRow.price*historyRow.amount)}</div>
                      </>
                    ))}
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
  
  const rows = [
    createData('January 2021'),
    createData('Febraury 2021'),
    createData('March 2021'),
    createData('April 2021'),
    createData('May 2021'),
    createData('June 2021'),
    createData('July 2021')
  ];


export default function moneyOwedPerMonth() {
  return (
    <div>
    <h1 style={{marginLeft:590,marginTop:30,marginBottom:30,color:"var(--primary-color)"}}>My Profit</h1>
    <TableContainer component={Paper} style={{width:700,margin:"auto"}}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:"black"}}>
          <TableRow>
            <TableCell />
            <TableCell style={{color:"white",paddingLeft:170}}>Month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{paddingTop:30}}></div>
    </div>
    
  )
}
