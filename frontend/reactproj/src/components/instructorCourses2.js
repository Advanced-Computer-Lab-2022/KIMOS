import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import ShowCourse from './showCourse/showCourse';
import Drawer from '@mui/material/Drawer';
import InstructorCourse from './instructorCourse';
import axios from 'axios';
const columns = [
  { 
    field: 'id', headerName: 'ID',
    renderCell: rowData => {
      return rowData.row.rating
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
        return <Rating value={rowData.row.rating}/>;
    },
    headerName: 'Course Rating',
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
      const res = await axios.get(`http://localhost:3000/courses/findCourses?user[userId]=638117c243cba3f0babcc3a9&instructorSearch=true`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      console.log('res.data');

      console.log(res.data);
      setRows(res.data);
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
  return (

    <div className='instructor-courses'>
        <div className='instructor-courses__title'>My Courses</div>
        <div className='instructor-courses__table'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                onRowClick = {showCourse}
                getRowId = {(row)=>{return row['_id']}}
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