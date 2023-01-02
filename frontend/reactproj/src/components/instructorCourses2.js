import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import ShowCourse from './showCourse/showCourse';
import Drawer from '@mui/material/Drawer';
import InstructorCourse from './instructorCourse';
import Loading from './loadingPage';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import axios from 'axios';



function InstructorCourses2(props) {

const [rows, setRows] = React.useState([]);
const [originalRows, setOriginalRows] = React.useState([]);

const [drawer, setDrawer] = React.useState(false);
const [displayedCourse, setDisplayedCourse] = React.useState({});
const [drafts, setDrafts] = React.useState(false);

const [loading, setLoading] = React.useState(true);
const columns = [
  { 
    field: 'id', headerName: 'ID',
    renderCell: rowData => {
      return rowData.row.rating.value
    },
    flex: 0.05,
    minWidth: 40,
    align:'center',
    headerAlign:'center',
    hide:true
  },
  { field: 'title', headerName: 'Course Name',
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center',

    },
  {
    field: 'totalHours',
    headerName: 'Total Hours',
    type: 'number',
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },
  {
    field: 'rating',
    type:'number',
    renderCell: rowData => {
        return <Rating value={rowData.row.rating.value}/>;
    },
    headerName: 'Course Rating',
    flex: 0.6,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

  {
    field: 'visibility',
    headerName: 'Visibility',
    renderCell: rowData => {
      var status = rowData.row.visibility;
      var leftP = 'Closed'
      if(status === 'private')
        leftP = 'Private'

      return (      <Stack direction="row" spacing={1} alignItems="center">
                         <p>{leftP}</p>
                         <Switch onChange={(e)=>{handleSwitchChange(e, rowData.row['_id'])}} defaultChecked={rowData.row.visibility === 'public'} inputProps={{ 'aria-label': 'ant design' }} />
                         <p>Public</p>
                     </Stack>)
 },
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

  {
    field: 'details',
    headerName: 'Course Details',
    renderCell: rowData => {

      return ( <div style={{
        cursor:'pointer',

      }} onClick={()=>{showCourse(rowData)}}><DisplaySettingsIcon style={{color:'var(--primary-color)'}}/></div>)
 },
    flex: 0.5,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

  //onRowClick = {showCourse}

];

const openCourse = (course)=>{
  console.log('openining')
}
const closeCourse = (course)=>{
  console.log('closing')
  
}
const handleSwitchCourses = ()=>{
  setDrafts(!drafts);
  generateRows(originalRows, !drafts);
}
const handleSwitchChange = async (e, id) =>{

  var res;
  try{
    if(!e.target.checked){
      res = await axios.post("http://localhost:5000/courses/close?courseId="+id)

    }
  
    else {
      res = await axios.patch("http://localhost:5000/courses?courseId="+id)
    }
    if(res.data.success)
      props.showAlert({shown:true, message:'Updated your course Visibility',severity:'success'})
    else
      props.showAlert({shown:true, message:'Couldnt Update your course Visibility',severity:'error'})


  }catch(e){


    props.showAlert({shown:true, message:'Closed courses cant become public again',severity:'error'})

  }

  getInstructorCourses();

}


const toggleDrawer = (event) => {

    setDrawer(!drawer);
  };
var courseObj ={id : 1, title: "Course Name",price:100,rating:3,  totalHours: 999, discount: {amount: 50, duration:{startDate:'start_date', endDate:'end_date'}},subject:"subject name" ,preview: "https://www.youtube.com/watch?v=PM2f835zx88&list=RDCLAK5uy_mVRuj5egfh21e-pXyA3ymx_0p4Xlg-c0I&index=2",
subtitles:[{title:"Subtitle Title",hours: 23, video: {link:"link as a string", description: "string"} },
           {title:"Subtitle Title Two",hours: 93, video: {link:"link as a string", description: "string"} }]};
React.useEffect(() => {
    getInstructorCourses();
  }, []);

  const getInstructorCourses = async () => {

    setLoading(true);
    setRows([]);


    try {
      const res = await axios.get(`http://localhost:5000/courses/?instructorSearch=true`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      // setRows(res.data.payload);
      setOriginalRows(res.data.payload);
      generateRows(res.data.payload, drafts);
      setLoading(false);
    } catch (e) {
      console.log(e)
    }
  };
    const generateRows = (rows, showDrafts)=>{
      var res = [];
      console.log('rege')
      rows.forEach((row)=>{
        if(showDrafts){
          if(row.visibility === 'private'){
            res.push(row);
          }
        }
        else{
          if(row.visibility !== 'private'){
            res.push(row);
          }
        }
      })
      setRows(res);
    }
  const showCourse = (rowData)=>{
    console.log(rowData.row);
    setDisplayedCourse(rowData.row);
    toggleDrawer();
  }
  return (

    <div className='instructor-courses'>
        <div className='instructor-courses__title' style={{display:'flex', alignItems:'center',}}>
          <div>My Courses</div>
          {!loading&&<Stack direction="row"  alignItems="center" justifyContent='center' style={{marginLeft:'20px',fontSize:'15px', height:'100%'}}>
                    <p>Drafts</p>
                    <Switch onChange={(e)=>{handleSwitchCourses(e)}} checked={!drafts} inputProps={{ 'aria-label': 'ant design' }} />
                    <p>Published</p>
          </Stack>}
        </div>
        <div>
 
        </div>
        <div className='instructor-courses__table' style={{position:'relative'}}>
        {loading && <Loading />}

            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize pagination 
                getRowId = {(row)=>{return row['_id']}}
                disableSelectionOnClick
                disableColumnSelector
            />
    </div>
    <Drawer
        anchor={'right'}
        open={drawer}
        onClose={toggleDrawer}
        PaperProps={{
            sx: { width: "80%" },
          }}
    >
            <InstructorCourse getInstructorCourses={getInstructorCourses} onClose={toggleDrawer} course={displayedCourse}/>
    </Drawer>
    </div>

  );
}



export default connect(null, {showAlert})(InstructorCourses2);

