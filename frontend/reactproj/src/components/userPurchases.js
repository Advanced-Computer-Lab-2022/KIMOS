import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import '../styles/components/popUp.scss';
import RefundRequest from '../components/refundRequest';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(title, date, price) {
  return { title, date, price};
}

const rows = [
  createData('MERN Stack', '4/7/2020', 2000),
  createData('Machine Learning', '6/10/2020', 5000),
  createData('Introduction to Java Programming', '1/1/2021', 1500),
  createData('Javascript', '5/1/2021', 1500),
  createData('Artificial Intelligance', '5/1/2021', 6000),
];

export default function UserPurchases() {
  const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:30}}>
      <h1>My Purchases</h1>
      <TableContainer component={Paper} style={{margin:"auto",width:"75%"}}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Course Name</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left" style={{paddingLeft:"45px"}}>Refund Request</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left">{row.price}</StyledTableCell>
                <StyledTableCell align="left" style={{paddingLeft:"45px"}}>
                <div>
                  <Button variant="outlined" style={{width:90,fontSize:"12px"}} onClick={handleClickOpen}>Request</Button>
                  <div>
                  {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <DisabledByDefaultIcon class="x" onClick={closePopup}></DisabledByDefaultIcon>
                            </div>
                            
                            <RefundRequest></RefundRequest>
                            
                        </div>
                    </div>:""
                  }
            </div>
                </div>
                
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  
  )
}
