import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { flexbox, minHeight } from '@mui/system';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { AppBar, Grid, Grow, Container } from '@mui/material';
import useStyles from '../styles/traineeViewMyCourse.scss';
import { motion } from 'framer-motion';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';

export default function TraineeViewMyCourse() {
  const [course, setCourse] = useState([]);
  const [value, setValue] = useState(3);
  const [isExerciseOpen, setIsExerciseOpen] = useState([false, false]);
  var subTitleCount = 1;
  var exerciseCount = 1;

  const [myCourse, setMyCourse] = useState({
    title: '',
    subtitles: [],
    price: '',
    summary: '',
    rating: 0,
    totalHours: '',
    discout: '',
    subject: '',
    instructor: '',
    exams: []
  });

  const getCourse = async () => {
    await axios
      .get('http://localhost:5000/courses', {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a'
        }
      })
      .then((course) => {
        console.log(course.data);
        setMyCourse(course.data);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <div
        style={{
          paddingTop: 50,
          paddingLeft: 150,
          backgroundColor: '#A30000',
          maxHeight: 350,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 14
        }}>
        <h1 style={{ color: 'white' }}>{myCourse.title}</h1>

        {/* summary */}
        <div style={{ maxWidth: 600, lineHeight: 1.8 }}>
          <h4 style={{ color: 'white', fontWeight: 'normal' }}>{myCourse.summary}</h4>
        </div>

        {/* Total Hours */}
        <h4 style={{ color: 'black' }}>Total Hours: {myCourse.totalHours} hrs</h4>

        {/* Instructor Name */}
        <h4 style={{ color: 'black' }}>
          Instructor: {myCourse.instructor.firstName} {myCourse.instructor.lastName}
        </h4>

        {/* Rating */}
        <Rating name="read-only" value={value} />
      </div>

      {/* Preview Video */}
      <Grow in>
        <Container style={{ maxWidth: 800 }}>
          <AppBar
            position="static"
            color="inherit"
            style={{
              paddingTop: 20,
              marginTop: -140,
              display: 'flex',
              alignItems: 'center',
              rowGap: 30,
              minHeight: 400
            }}>
            <h1>Preview</h1>
            <iframe Width="600" Height="250" src={myCourse.preview}></iframe>
          </AppBar>
        </Container>
      </Grow>

      <Container style={{ display: 'flex' }}>
        {/* subTitles */}
        <Grow in>
          <Container style={{ maxWidth: 800 }}>
            <AppBar
              className="appBar3"
              position="static"
              color="inherit"
              style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 10,
                paddingTop: 20
              }}>
              <h1 style={{ marginBottom: 10 }}>Subtitles</h1>

              {myCourse.subtitles.map((subtitle) => {
                return (
                  <AccordionSubtitle
                    title={`Subtitle ${subTitleCount++} : ${subtitle.title}`}
                    duration={`${subtitle.hours} hrs`}
                    link={subtitle.video.link}
                  />
                );
              })}

              <div style={{ minHeight: 30 }}> </div>
            </AppBar>
          </Container>
        </Grow>

        {/* Exercises */}
        <Grow in>
          <Container style={{ maxWidth: 400 }}>
            <AppBar
              className="appBar4"
              position="static"
              color="inherit"
              style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 10,
                paddingTop: 20
              }}>
              <h1 style={{ marginBottom: 10 }}>Exercises</h1>

              {myCourse.exams.map((exam) => {
                return (
                  <Accordion
                    title={`Exercise ${exerciseCount++}`}
                    content={`Grade: ${exam.grade}`}
                    exam={exam}
                  />
                );
              })}
              <div style={{ minHeight: 30 }}></div>
            </AppBar>
          </Container>
        </Grow>
      </Container>

      <div style={{ minHeight: 50 }}></div>
    </>
  );
}
