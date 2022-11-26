import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { Container } from '@mui/material';

export default function Create() {
  const instructor_id = '635d70dbf600410aab3c71b0';
  console.log(instructor_id);
  var subtitleCount = 1;
  var exercisesCount = 1;
  const [course, setCourse] = useState({
    title: '',
    subtitles: [],
    price: '',
    summary: '',
    rating: 0,
    totalHours: '',
    discount: '',
    subject: '',
    instructor: instructor_id,
    exercises: []
  });

  const [subtitleList, setSubtitle] = useState([{ Title: '', Hours: '' }]);
  const [exercisesList, setExercises] = useState(['']);

  //console.log(subtitleList);

  //we use axios to send date from frontend to backend
  const createCourse = () => {
    course.instructor = instructor_id;
    axios.post('http://localhost:3000/users/instructor/createCourse', {
      user:{userType:'instructor'},
      course: course
    }).then(() => {
      window.location.reload(false);
    });
  };

  const addSubTitle = () => {
    setSubtitle([...subtitleList, { Title: '', Hours: '' }]);
  };
  const addExercises = () => {
    setExercises([...exercisesList, '']);
  };

  const handleChange = (event, index) => {
    console.log(course);
    const { name, value } = event.target;
    const list = [...subtitleList];
    list[index][name] = value;
    course.subtitles = list;
    setSubtitle(list);
  };
  const handleChangeExercises = (event, index) => {
    console.log(course);
    const { value } = event.target;
    const list = [...exercisesList];
    list[index] = value;
    course.exercises = list;
    setExercises(list);
  };

  return (
    <div className="create-course">
      <h2>Create A New Course</h2>

      <TextField
        required
        id="Title"
        className="outlined-basic"
        label="Title"
        variant="outlined"
        value={course.title}
        onChange={(event) => {
          setCourse({ ...course, title: event.target.value });
        }}
      />
      <TextField
        required
        id="Subject"
        className="outlined-basic2"
        label="Subject"
        variant="outlined"
        value={course.subject}
        onChange={(event) => {
          setCourse({ ...course, subject: event.target.value });
        }}
      />

      {/* subtitles */}
      {subtitleList.map((singleSubtitle, index) => (
        <div key={index}>
          <p style={{ fontSize: 15 }}>{`SubTitle ${subtitleCount++}`}</p>
          <TextField
            required
            name="Title"
            id="outlined-basic3"
            label="Title"
            variant="outlined"
            //value={singleSubtitle.subtitle}
            onChange={(e) => handleChange(e, index)}
          />
          <TextField
            required
            name="Hours"
            id="outlined-basic3"
            label="Hours"
            variant="outlined"
            //value={singleSubtitle.subtitle}
            onChange={(e) => handleChange(e, index)}
          />

          {subtitleList.length - 1 === index && (
            <AddCircleOutlineIcon
              variant="contained"
              style={{ minWidth: '50px', marginTop: '15px', cursor: 'pointer' }}
              onClick={addSubTitle}></AddCircleOutlineIcon>
          )}
        </div>
      ))}
      {/* exercises */}
      {exercisesList.map((singleExercise, index) => (
        <div key={index}>
          <p style={{ fontSize: 15 }}>{`Exercise ${exercisesCount++}`}</p>
          <TextField
            required
            name="Title"
            id="outlined-basic3"
            label="Title"
            variant="outlined"
            //value={singleSubtitle.subtitle}
            onChange={(e) => handleChangeExercises(e, index)}
          />

          {exercisesList.length - 1 === index && (
            <AddCircleOutlineIcon
              variant="contained"
              style={{ minWidth: '50px', marginTop: '15px', cursor: 'pointer' }}
              onClick={addExercises}></AddCircleOutlineIcon>
          )}
        </div>
      ))}

      {/* <TextField
        required
        id="outlined-basic5"
        label="Total Hours"
        variant="outlined"
        value={course.totalHours}
        onChange={(event) => {
          setCourse({ ...course, totalHours: event.target.value });
        }}
      /> */}

      <TextField
        required
        id="outlined-basic4"
        label="Price"
        variant="outlined"
        value={course.price}
        onChange={(event) => {
          setCourse({ ...course, price: event.target.value });
        }}
      />

      <TextField
        multiline
        required
        id="outlined-basic6"
        InputProps={{ sx: { minHeight: 120, minWidth: 225 } }}
        label="Summary"
        variant="outlined"
        value={course.summary}
        onChange={(event) => {
          setCourse({ ...course, summary: event.target.value });
        }}
      />

      <Button
        variant="contained"
        style={{ minWidth: '120px', marginLeft: '50px' }}
        onClick={createCourse}>
        Add
      </Button>
    </div>
  );
}
