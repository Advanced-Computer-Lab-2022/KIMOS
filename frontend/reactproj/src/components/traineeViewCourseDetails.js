import React, { useState, useEffect } from 'react';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';
import ExamSolution from './TraineeSolution.js';
import WatchVideo from './watchVideo.js';
import ViewExam from './TraineeExercise.js';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import PrimaryBtn from './buttons/primaryBtn.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

export default function TraineeViewMyCourse(props) {
  const [viewExam, setViewExam] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [value, setValue] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const [solveExam, setSolveExam] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(-1);
  const [currentExam, setCurrentExam] = useState(-1);
  const [courseRatingValue, setCourseRatingValue] = useState(0);
  const onChangeExam = (newExamId) => {

    setCurrentExam(newExamId);
    setCurrentSubtitle(-1);
  };
  const onChangeSolution = (newState) => {
    setSolveExam(newState);
    setViewExam(!newState);
  };
  const onChangeView = (newState) => {
    setSolveExam(!newState);
    setViewExam(newState);
  };
  const onChangeSubtitle = (newSubtitleId) => {
    setCurrentSubtitle(newSubtitleId);
    setCurrentExam(-1);

  };

  const postRating = async () => {
    const res = await axios.post(
      'http://localhost:5000/courses/rate',
      { rating: courseRatingValue },
      {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a'
        }
      }
    );

    if (res.statusText === 'OK') {
      setSubmitSuccess(true);
    }
  };
  const drawerContent = () => {
    return (
      <div className="questions-display-2">
        <div className="user-course__content">
          <div className="user-course__content__section">
            <div className="user-course__content__section__title">Subtitle(s)</div>
            <div className="user-course__content__section__content">
              <div className="user-course__content__section__content__accordions">
                {props.course.subtitles.map((subtitle, index) => {
                  return (
                    <AccordionSubtitle
                      subtitleId={index}
                      changeCurrentSubtitle={onChangeSubtitle}
                      title={`${subtitle.title}`}
                      duration={`${subtitle.hours} hrs`}
                      link={subtitle.video.link}
                    />
                  );
                })}
              </div>
            </div>
            <div className="user-course__content__section__title">Exercise(s)</div>
            <div className="user-course__content__section__content">
              <div className="user-course__content__section__content__accordions">
                {props.course.exams.map((exam) => {
                  return (
                    <Accordion
                      examId={exam._id}
                      title={exam.title}
                      solved={exam.solved}
                      changeCurrentExam={onChangeExam}
                      changeSolveExam={onChangeSolution}
                      changeViewExam={onChangeView}
                      content={`Grade: ${exam.grade}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    handleMenuChange(0);
  }, []);

  useEffect(() => {
    postRating();
  }, [courseRatingValue]);
  var subTitleCount = 1;
  var exerciseCount = 1;
  const handleMenuChange = (newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      //show first subtitle
      onChangeSubtitle(0);
    } else if (newValue === 1) {
      //show first exercise
      onChangeView(true);
      onChangeExam(props.course.exams[0]['_id']);
    }
  };

  const getSubs = () => {
    return props.course.subtitles.map((subtitle, index) => {
      return (
        <div
          className={`question ${currentSubtitle === index ? 'selected-q' : ''}`}
          onClick={() => {
            onChangeSubtitle(index);
          }}>
          {subtitle.title}
        </div>
      );
    });
  };
  const [report, setReport] = useState({title:'',type:'technical',issue:''});

  const handleReportChange = (e)=>{
    var key = e.target.id? e.target.id : 'type';
    var r = {...report};
    r[key] = e.target.value;
    setReport(r);

  }
  const submitReport = ()=>{

  }
  const getReport = ()=>{
    return (<div className='submit-report'>
              <div className='submit-report__form'>
                <div className='submit-report__form__title'>Report A Course</div>


                <div className='submit-report__form__input'>
                  <TextField onChange={handleReportChange} style={{marginBottom:'10px', width:'50%'}} id="title" label="Title" variant="outlined" />

                  <div style={{marginBottom:'10px', width:'20%'}}>
                    <InputLabel >Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="type"
                        value={report.type}
                        label="Type"
                        onChange={handleReportChange}
                      >
                      <MenuItem value={'technical'}>Technical</MenuItem>
                      <MenuItem value={'financial'}>Financial</MenuItem>
                      <MenuItem value={'other'}>Other</MenuItem>
                    </Select> 
                  
                  </div>
                  <TextField onChange={handleReportChange} style={{marginBottom:'10px'}} id="issue" label="Issue" variant="outlined" multiline rows={6}/>
                </div>

                <div className='submit-report__form__submit'><PrimaryBtn function ={submitReport} btnText="Send"/></div>

              </div>
            </div>)
  }
  const getExams = () => {
    return props.course.exams.map((exam, index) => {
      return (
        <div
          className={`question ${currentExam === exam['_id'] ? 'selected-q' : ''}`}
          onClick={() => {
            onChangeView(true);
            onChangeExam(props.course.exams[index]['_id']);
          }}>
          {exam.title + ' ' + index}
        </div>
      );
    });
  };
  return (
    <div style={{ position: 'relative' }}>

      <Modal
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}>
        {getReport()}
      </Modal>


      <Modal
        open={openRating}
        onClose={() => {
          setOpenRating(false);
        }}>
        <div
          style={{
            borderRadius: '10px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
            height: '10%',
            position: 'absolute',
            left: '50%',
            top: '35%',
            transform: 'translate(-50%,-35%)'
          }}>
          Rate this course
          <div>
            <Rating
              name="rating-the-couse"
              value={courseRatingValue}
              onChange={(event, newValue) => {
                setCourseRatingValue(newValue);
              }}
              sx={{ width: '100%', height: '100%', fontSize: '3.5vw' }}
            />
          </div>
        </div>
      </Modal>
      <div
        style={{
          zIndex: '10',
          background: 'var(--cool-grey)',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        }}>
        <div
          onClick={() => {
            setOpenRating(true);
          }}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translate(10%,-50%)',
            display: 'flex',
            alignItems: 'center',
            color: 'grey',
            fontWeight: 'lighter'
          }}>
          Leave Rating <StarIcon />
        </div>

        <div
          onClick={() => {
            setOpenReport(true);
          }}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: '100%',
            top: '50%',
            transform: 'translate(-100%,-50%)',
            display: 'flex',
            alignItems: 'center',
            color: 'grey',
            fontWeight: 'lighter',
            width:'150px'
          }}>
          Report Problem <ReportGmailerrorredIcon/>
        </div>
        <BottomNavigation
          showLabels
          value={0}
          style={{ background: 'var(--cool-grey)', borderTop: '0.5px solid grey' }}
          onChange={(event, newValue) => {
            handleMenuChange(newValue);
          }}>
          <BottomNavigationAction label="Subtitles" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Exercises" icon={<FavoriteIcon />} />
        </BottomNavigation>

        <div style={{marginLeft:"90%",marginTop:-48,marginBottom:3}}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={70} size="6.5vh" />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              70%
            </Typography>
          </Box>
        </Box>
        </div>
        
        
      </div>

      <div className="content" style={{ height: '100%', width: '100%' }}>
        {value === 1 ? (
          solveExam ? (
            <div className="with-menu-container">
              <div className="left-options">
                {props.course.exams.map((exam) => {
                  return (
                    <Accordion
                      examId={exam._id}
                      title={exam.title}
                      solved={exam.solved}
                      changeCurrentExam={onChangeExam}
                      changeSolveExam={onChangeSolution}
                      changeViewExam={onChangeView}
                      content={`Grade: ${exam.grade}`}
                      style={{ background: 'red' }}
                    />
                  );
                })}
              </div>

              <div className="right-exam">
                <ExamSolution examId={currentExam} />
              </div>
            </div>
          ) : viewExam ? (
            <div className="with-menu-container">
              <div className="left-options">
                {props.course.exams.map((exam) => {
                  return (
                    <Accordion
                      style={{ width: '100% !important' }}
                      examId={exam._id}
                      title={exam.title}
                      solved={exam.solved}
                      changeCurrentExam={onChangeExam}
                      changeSolveExam={onChangeSolution}
                      changeViewExam={onChangeView}
                      content={`Grade: ${exam.grade}`}
                    />
                  );
                })}
              </div>

              <div className="right-exam">
                <ViewExam examId={currentExam} showSolution={onChangeSolution} />
              </div>
            </div>
          ) : (
            <></>
          )
        ) : value === 0 && props.course.subtitles[currentSubtitle] ? (
          <div className="with-menu-container">
            <div className="left-options">
              <div className="questions-display">{getSubs()}</div>
            </div>

            <div className="right-video">
              <WatchVideo
                link={props.course.subtitles[currentSubtitle].video.link}
                description={props.course.subtitles[currentSubtitle].video.description}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
