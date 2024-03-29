import React,{useState,useEffect} from 'react';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loading from './loadingPage';

import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


export default function UserPurchases() {
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPurchases = async () => {

    setLoading(true);
    await axios
      .get('http://localhost:5000/users/registeredInvoices')
        .then((result) => {
          setLoading(false);

        setMyPurchases(result.data.payload.invoices);
      });
  };

  useEffect(() => {
    getPurchases();
  }, []);


  const [popup,setPop]=useState(false);
  //
  const [openSuccess, setOpenSuccess] = React.useState(false);

    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }

    const successRefundRequest=(isSuccess)=>{
      setOpenSuccess(isSuccess);
    }

    //
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSuccess(false);
    };

  return (
    <div style={{position:'relative',display:"flex",flexDirection:"column",justifyContent:"center",marginTop:0}}>
      <h1 style={{color:"var(--primary-color)"}}>My Purchases</h1>
      {loading && <Loading/>}
      <TableContainer component={Paper} style={{margin:"auto",width:"75%",marginTop:50}}>
        <Table aria-label="customized table">
          <TableHead style={{background:"var(--primary-color)"}}>
            <TableRow style={{background:"var(--primary-color)"}}>
              <StyledTableCell style={{background:"var(--primary-color)"}} align="center">Course Name</StyledTableCell>
              <StyledTableCell style={{background:"var(--primary-color)"}} align="center">Date</StyledTableCell>
              <StyledTableCell style={{background:"var(--primary-color)"}} align="center">Price</StyledTableCell>
              <StyledTableCell style={{background:"var(--primary-color)"}} align="center">Refund Request</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myPurchases.map((purchase) => (
              <StyledTableRow key={purchase.couseName}>
                <StyledTableCell align="center">{purchase.courseName}</StyledTableCell>
                <StyledTableCell align="center">{purchase.date}</StyledTableCell>
                <StyledTableCell align="center">{purchase.price}</StyledTableCell>
                {purchase.status=="noRefund"?
                  <StyledTableCell align="center" style={{color:"var(--primary-color)"}}>No Refund</StyledTableCell>
                  :
                  purchase.status=="pending"?
                  <StyledTableCell align="center" style={{color:"var(--primary-color)"}}>Pending</StyledTableCell>
                  :
                <StyledTableCell align="center" >
                <div>
                  <Button variant="outlined" value={openSuccess} style={{width:90,fontSize:"12px"}} onClick={handleClickOpen}>Request</Button>
                  <div>
                  {
                    popup?
                    <div  style={{ textAlign:"left"}}>
                        <div className="popup" style={{ 
                          position:'absolute',
                          left:'50%',
                          top:'50%',
                          transform:'translate(-50%,-50%)',
                          backdropFilter: 'blur(1px)'
                        }}>
                            <div className="popup-header">
                                <DisabledByDefaultIcon class="x" onClick={closePopup}></DisabledByDefaultIcon>
                            </div>
                            
                            <RefundRequest close={closePopup} feedback={successRefundRequest} courseId={purchase._id._id}></RefundRequest>
                            
                        </div>
                    </div>:""
                  }
                  </div>
                </div>
                </StyledTableCell>
              
              
                }
                </StyledTableRow>  
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openSuccess ? 
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your request is sent successfully!
            </Alert>
          </Snackbar>:<div></div>
        }
    </div>
  
  )
}
