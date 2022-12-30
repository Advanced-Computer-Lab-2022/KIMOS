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

import axios from 'axios';



function InstructorCourses2(props) {

const [rows, setRows] = React.useState([]);
const [drawer, setDrawer] = React.useState(false);
const [displayedCourse, setDisplayedCourse] = React.useState({});
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
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

  {
    field: 'visibility',
    headerName: 'Visibility',
    renderCell: rowData => {
      var status = rowData.row.visibility === 'public' ? 'Public':'Private' 
      return (      <Stack direction="row" spacing={1} alignItems="center">
                         <Switch onChange={(e)=>{handleSwitchChange(e, rowData.row['_id'])}} defaultChecked={rowData.row.visibility === 'public'} inputProps={{ 'aria-label': 'ant design' }} />
                         <p>{status}</p>
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


const handleSwitchChange = async (e, id) =>{
  console.log('hi hi hi');
  console.log(e.target.checked)
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

    var mssg = e.response.data.message? e.response.data.message[Object.keys(e.response.data.message)[0]] :'Couldnt Update your course Visibility2'
    props.showAlert({shown:true, message:mssg,severity:'error'})

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
    // generateRows();
    getInstructorCourses();
  }, []);

  const getInstructorCourses = async () => {

    setLoading(true);
    setRows([]);


    try {
      const res = await axios.get(`http://localhost:5000/courses/?instructorSearch=true`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });

      setRows(res.data.payload);
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
    console.log(rowData.row);
    setDisplayedCourse(rowData.row);
    toggleDrawer();
  }
  return (

    <div className='instructor-courses'>
        <div className='instructor-courses__title'>My Courses</div>
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
            <InstructorCourse onClose={toggleDrawer} course={displayedCourse}/>
    </Drawer>
    </div>

  );
}



export default connect(null, {showAlert})(InstructorCourses2);

