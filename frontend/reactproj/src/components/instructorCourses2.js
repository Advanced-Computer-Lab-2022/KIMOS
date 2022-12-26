import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import ShowCourse from './showCourse/showCourse';
import Drawer from '@mui/material/Drawer';
import InstructorCourse from './instructorCourse';
import Loading from './loadingPage';

import axios from 'axios';
const columns = [
  { 
    field: 'id', headerName: 'ID',
    renderCell: rowData => {
      return rowData.row.rating.value
    },
    flex: 0.05,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
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
    flex: 1,
    minWidth: 40,
    align:'center',
    headerAlign:'center'
  },

];






export default function InstructorCourses2() {

const [rows, setRows] = React.useState([]);
const [drawer, setDrawer] = React.useState(false);
const [displayedCourse, setDisplayedCourse] = React.useState({});
const [loading, setLoading] = React.useState(true);
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
    console.log('getting')
    try {
      const res = await axios.get(`http://localhost:5000/courses/?instructorSearch=true`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      console.log(res)
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
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick = {showCourse}
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
            <InstructorCourse course={displayedCourse}/>
    </Drawer>
    </div>

  );
}