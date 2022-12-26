import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import Drawer from '@mui/material/Drawer';
import PrimaryBtn from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Loading from './loadingPage';

import axios from 'axios';
const columns = [
  { 
    field: 'id', headerName: 'ID',
    renderCell: (rowData,index)=> {
      return rowData.row['_id']
    },
    flex: 0.05,
    minWidth: 40,
    align:'center',
    hideable: false,
    headerAlign:'center'
  },
  { field: 'title', headerName: 'Course Name',
    flex: 4,
    minWidth: 40,
    align:'center',
    headerAlign:'center',

    },

  {
    field: 'reqAcc',
    renderCell: rowData => {
        return <SecondaryBtn btnText="Request"/>;
    },
    headerName: 'Request Access',
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

];






export default function AddPromotions() {

const [rows, setRows] = React.useState([]);
const [selectedRows, setSelectedRows] = React.useState([]);
const [discount, setDiscount] = React.useState({amount:0});

const [displayedStartDate, setDisplayedStartDate] = React.useState(null);
const [displayedEndDate, setDisplayedEndDate] = React.useState(null);




const [drawer, setDrawer] = React.useState(false);
const [loading, setLoading] = React.useState(true);


const toggleDrawer = (event) => {
    setDrawer(!drawer);
  };

React.useEffect(() => {
    // generateRows();
    getInstructorCourses();
  }, []);

  const getInstructorCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/courses`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      setRows(res.data.payload);
      setLoading(false);
    } catch (e) {

    }
  };

  const handleSelected = ()=>{
    toggleDrawer();
  }

  const handleDiscount =(e)=>{
    var oldDisc = {...discount};
    oldDisc.amount = e.target.value;
    setDiscount(oldDisc);
  }

  return (

    <div className='instructor-courses'>
        {loading && <Loading />}
        <div className='instructor-courses__title' style={{display:'flex', justifyContent:'space-between', width:'100%'}}><div>Request Access To Courses</div><div>{selectedRows.length !== 0 && <PrimaryBtn btnText={'Add Promotion'} function={handleSelected}/>}</div></div>
        <div className='instructor-courses__table'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                getRowId = {(row)=>{return row['_id']}}
                disableSelectionOnClick
                columnVisibilityModel={{
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                  }}
            />
    </div>
  
    </div>

  );
}