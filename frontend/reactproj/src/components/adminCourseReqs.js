import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import Drawer from '@mui/material/Drawer';
import PrimaryBtn from './buttons/primaryBtn';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Loading from './loadingPage';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import axios from 'axios';




export default function AdminCourseReqs() {

  const columns = [

    { field: 'title', headerName: 'Course Name',
      flex: 1,
      minWidth: 40,
      align:'center',
      headerAlign:'center',
  
      },
      { 
        field: 'id', headerName: 'Course ID',
        renderCell: (rowData,index)=> {
          return index
        },
        flex: 1,
        minWidth: 40,
        hide:true,
        align:'center',
        headerAlign:'center'
      },
      { 
        field: 'courseId', headerName: 'Course ID',
        flex: 1,
        minWidth: 40,
        align:'center',
        headerAlign:'center'
      },
      
    { field: 'username', headerName: 'User Name',
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center',
  
    },
    {
      field: 'userId',
      headerName: 'User Id',
      type: 'string',
      flex: 1,
      minWidth: 40,
      align:'center',
      headerAlign:'center'
    },
    {
      field: 'actions',
      headerName: 'Accept/Reject',
      renderCell: (rowData)=>{
        return <div>{CorrectActionBtn(rowData)} { rejectActionBtn(rowData)}</div>
      },
      flex: 1,
      minWidth: 40,
      align:'center',
      headerAlign:'center'
    },
  ];
  
  

  
const [rows, setRows] = React.useState([]);
const [selectedRows, setSelectedRows] = React.useState([]);
const [loading, setLoading] = React.useState(true);

const [discount, setDiscount] = React.useState({amount:0});

const [displayedStartDate, setDisplayedStartDate] = React.useState(null);
const [displayedEndDate, setDisplayedEndDate] = React.useState(null);




const [drawer, setDrawer] = React.useState(false);
const [displayedCourse, setDisplayedCourse] = React.useState({});


const sendRes = async (status, id)=>{
  const res = await axios.post("http://localhost:5000/users/accessStatus?requestId="+id,{newState:status})
  console.log(res);
}

const CorrectActionBtn = (rowData)=>{
  return (
    <IconButton
      size="small"
      sx ={{background:'#ACE1AF',color:'#006A4E'}}
      onClick={()=>sendRes('accepted', rowData.row['_id'])}
      >
        <CheckIcon />
  </IconButton>
  )
}
const rejectActionBtn = (rowData)=>{
  return (
    <IconButton
      size="small"
      sx ={{background:'#F08080',color:'#CC0000'}}
      onClick={()=>sendRes('rejected', rowData.row['_id'])}

      >
        <ClearIcon />
  </IconButton>
  )
}

const toggleDrawer = (event) => {

    setDrawer(!drawer);
  };
var courseObj ={id : 1, title: "Course Name",price:100,rating:3,  totalHours: 999, discount: {amount: 50, duration:{startDate:'start_date', endDate:'end_date'}},subject:"subject name" ,preview: "https://www.youtube.com/watch?v=PM2f835zx88&list=RDCLAK5uy_mVRuj5egfh21e-pXyA3ymx_0p4Xlg-c0I&index=2",
subtitles:[{ title:"Subtitle Title",hours: 23, video: {link:"link as a string", description: "string"} },
           { title:"Subtitle Title Two",hours: 93, video: {link:"link as a string", description: "string"} }]};
React.useEffect(() => {
    // generateRows();
    getInstructorCourses();
  }, []);

  const getInstructorCourses = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/users/requests?requestType=access`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });


      if(res.data.payload){
        setRows(res.data.payload);
      }
      setLoading(false);
    } catch (e) {
      console.log(e)
    }
  };
    const generateRows = ()=>{

        var i = 0;
        var tmp = [];
        while(i<20){
            var courseObjnew = {...courseObj};
            courseObjnew.id = i+1;
            courseObjnew.rating = (i+1)%5 + 1;

            tmp.push(courseObjnew);
            i++;
        }
        setRows(tmp);
    }
  const showCourse = (rowData)=>{

    setDisplayedCourse(rowData.row);
    toggleDrawer();
  }
  const handleSelected = ()=>{
    toggleDrawer();
  }
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row['_id'] === id));
    setSelectedRows(selectedRowsData);
  };
  const handleDiscount =(e)=>{
    var oldDisc = {...discount};
    oldDisc.amount = e.target.value;
    setDiscount(oldDisc);
  }
  const displayDate = ()=>{


    if(discount.amount > 0)
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='date-picker'>
                <DatePicker
                label="Start Date"
                value={displayedStartDate}
                onChange={(newValue) => {
                    // setValue(newValue);

                    setDisplayedStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
                <div className='date-picker__sep'/>
                <DatePicker

                label="Ending Date"
                value={displayedEndDate}

                onChange={(newValue) => {
                    // setValue(newValue);
                    setDisplayedEndDate(newValue);



                }}
                renderInput={(params) => <TextField {...params} />}
                />
            </div>

      </LocalizationProvider>
    )
    else
        return <div></div>
}
  return (

    <div className='instructor-courses'>
        {loading && <Loading />}
        <div className='instructor-courses__title' style={{display:'flex', justifyContent:'space-between', width:'100%'}}><div>Courses Requests</div><div>{selectedRows.length !== 0 && <PrimaryBtn btnText={'Add Promotion'} function={handleSelected}/>}</div></div>
        <div className='instructor-courses__table'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                getRowId = {(row)=>{return row['_id']}}
                checkboxSelection
                disableSelectionOnClick

            />
    </div>
  
    <Modal
    open={drawer}
    onClose={toggleDrawer}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
        <div style={{
            position:'absolute',
            left:'50%',
            top:'50%',
            transform:'translate(-50%,-50%)',
            background:'white',
            borderRadius:'10px',
            width:'50%',
            height:'50%',
            padding:'20px'
        }}>
            <div style={{color:'var(--primary-color)', fontSize:'25px', fontWeight:'bolder'}}>Add Promotion To The Selected Courses</div>
            <div style={{height:'90%'}}>
            <div  style={{marginBottom:'10px',marginTop:'10px', height:'100%', padding:'20px', display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'column',marginBottom:'30px'}}>
                    <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
                        <TextField onChange={handleDiscount} value={discount ?discount.amount:0} label="Discount" variant="outlined" />
                        <div style={{color:'grey', marginLeft:'5px'}}>%</div>        
                    </div>

                        {displayDate()}
                </div>
                    
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {(discount.amount > 0) && <PrimaryBtn btnText="Submit Promotion"/>}
                    </div>
                </div>
            </div>
        
        
        </div>
    </Modal>
    </div>

  );
}