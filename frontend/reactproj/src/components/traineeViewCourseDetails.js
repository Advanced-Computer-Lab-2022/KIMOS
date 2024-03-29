import React, { useState, useEffect } from 'react';
// import Accordion from './accordionExercise.js';
import Accordion from '@mui/material/Accordion';
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
import { Typography } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TakeNotes from './takeNotes2';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { showAlert } from '../redux/actions';
import { connect } from 'react-redux';

function TraineeViewMyCourse(props) {
  const [viewExam, setViewExam] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [value, setValue] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [video, setVideo] = useState({});
  const [quiz, setQuiz] = useState({});

  const [solveExam, setSolveExam] = useState(false);
  const [progress, setProgress] = useState(0);

  const [currentSubtitle, setCurrentSubtitle] = useState(-1);
  const [currentExam, setCurrentExam] = useState(-1);
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
  const examExists = ()=>{
    //check subtitles;
    var exam = null;
    props.course.subtitles.forEach((subtitle)=>{
      if(subtitle.quizzes.length > 0){
        exam = subtitle.quizzes[0]
      }
    })
  return exam;
  }
  useEffect(() => {

    setProgress(props.course.progress)
    if (props.course.subtitles[0].videos) setVideo(props.course.subtitles[0].videos[0]);
    if(examExists()!==null){
      setQuiz(examExists());
    }
    handleMenuChange(0);
  }, []);

  var subTitleCount = 1;
  var exerciseCount = 1;
  const handleMenuChange = (newValue) => {
    if (newValue === 0) {
    setValue(newValue);
      //show first subtitle
      onChangeSubtitle(0);
    } else if (newValue === 1) {
      //show first exercise
      console.log("HJER");
      if(examExists() !== null){
        setValue(newValue);
        onChangeView(true);
        onChangeExam(examExists()["_id"]);
      }
      else{
        props.showAlert({
          shown: true,
          message: 'No Exams',
          severity: 'error'
        });
      }

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
  const [report, setReport] = useState({ title: '', type: 'technical', issue: '' });

  const handleReportChange = (e) => {
    var key = e.target.id ? e.target.id : 'type';
    var r = { ...report };
    r[key] = e.target.value;
    setReport(r);
  };

  const submitReport = async () => {
    const res = await axios.post('http://localhost:5000/users/report', report, {
      params: {
        courseId: props.course['_id']
      }
    });

    if (res.data.success) {
      setOpenReport(false);
      props.showAlert({
        shown: true,
        message: 'Updated your course Visibility',
        severity: 'success'
      });
    } else
      props.showAlert({
        shown: true,
        message: 'Couldnt Update your course Visibility',
        severity: 'error'
      });
  };
  const getReport = () => {
    return (
      <div className="submit-report">
        <div className="submit-report__form">
          <div className="submit-report__form__title">Report A Course</div>

          <div className="submit-report__form__input">
            <TextField
              onChange={handleReportChange}
              style={{ marginBottom: '10px', width: '50%' }}
              id="title"
              label="Title"
              variant="outlined"
            />

            <div style={{ marginBottom: '10px', width: '20%' }}>
              <InputLabel>Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                value={report.type}
                label="Type"
                onChange={handleReportChange}>
                <MenuItem value={'technical'}>Technical</MenuItem>
                <MenuItem value={'financial'}>Financial</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            </div>
            <TextField
              onChange={handleReportChange}
              style={{ marginBottom: '10px' }}
              id="issue"
              label="Issue"
              variant="outlined"
              multiline
              rows={6}
            />
          </div>

          <div className="submit-report__form__submit">
            <PrimaryBtn function={submitReport} btnText="Send" />
          </div>
        </div>
      </div>
    );
  };
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
  const getProgress = () => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={progress }
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography variant="caption" component="div">
            {`${Math.round(progress )}%`}
          </Typography>
        </Box>
      </Box>
    );
  };

  const accordion = (subtitle) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div style={{ width: '100%' }}>
            <Typography style={{ color: 'var(--primary-color)', fontWeight: 'bolder' }}>
              {subtitle.title}
            </Typography>
            <Typography>
              <small>{subtitle.hours} Minutes(s)</small>
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-course__subtitles__subtitles__videos-list">
            {subtitle.videos.map((lvideo, index) => {
              return (
                <div
                  className={
                    video['_id'] === lvideo['_id']
                      ? 'my-course__subtitles__subtitles__videos-list__video-active'
                      : 'my-course__subtitles__subtitles__videos-list__video'
                  }
                  onClick={() => {
                    console.log(lvideo);
                    setVideo(lvideo);
                  }}>
                  <div>
                    <div>{'Section ' + (index + 1)}</div>
                  </div>
                  <div>
                    <PlayCircleFilledWhiteIcon
                      style={{
                        cursor: 'pointer',
                        color: video['_id'] === lvideo['_id'] ? 'white' : 'var(--primary-color)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };
  const accordionExam2 = (exams)=>{
    return <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header">
      <div style={{ width: '100%' }}>
        <Typography style={{ color: 'var(--primary-color)', fontWeight: 'bolder' }}>
          Final Exams
        </Typography>
        <Typography>
          <small>{exams.length} Exam(s)</small>
        </Typography>
      </div>
    </AccordionSummary>
    <AccordionDetails>
      <div className="my-course__subtitles__subtitles__videos-list">
        {exams.map((lquiz, index) => {
          return (
            <div
              className={
                quiz['_id'] === lquiz['_id']
                  ? 'my-course__subtitles__subtitles__videos-list__video-active'
                  : 'my-course__subtitles__subtitles__videos-list__video'
              }
              onClick={() => {
                setQuiz(lquiz);
                console.log('Final ');
                console.log(lquiz);
                if (lquiz.solved) {
                  console.log('set solved');
                  onChangeSolution(true);
                } else {
                  onChangeView(true);
                }
              }}>
              <div>
                <div>{lquiz.title}</div>
              </div>
              <div>
              {lquiz.solved ? (
                <VisibilityTwoToneIcon
                  style={{
                    cursor: 'pointer',
                    color: quiz['_id'] === lquiz['_id'] ? 'white' : 'var(--primary-color)'
                  }}
                />
              ) : (
                <DriveFileRenameOutlineIcon
                  style={{
                    cursor: 'pointer',
                    color: quiz['_id'] === lquiz['_id'] ? 'white' : 'var(--primary-color)'
                  }}
                />
              )}
              </div>
            </div>
          );
        })}
      </div>
    </AccordionDetails>
  </Accordion>
  }
  const accordionExam = (subtitle) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div style={{ width: '100%' }}>
            <Typography style={{ color: 'var(--primary-color)', fontWeight: 'bolder' }}>
              {subtitle.title}
            </Typography>
            <Typography>
              <small>{subtitle.quizzes.length} Quiz(zes)</small>
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-course__subtitles__subtitles__videos-list">
            {subtitle.quizzes.map((lquiz, index) => {
              return (
                <div
                  className={
                    quiz['_id'] === lquiz['_id']
                      ? 'my-course__subtitles__subtitles__videos-list__video-active'
                      : 'my-course__subtitles__subtitles__videos-list__video'
                  }
                  onClick={() => {
                    console.log('quiz l');

                    console.log(lquiz);
                    setQuiz(lquiz);
                    if (lquiz.solved) {
                      console.log('set solved');
                      onChangeSolution(true);
                    } else {
                      onChangeView(true);
                    }
                  }}>
                  <div>
                    <div>{lquiz.title}</div>
                  </div>
                  <div>
                  {lquiz.solved ? (
                    <VisibilityTwoToneIcon
                      style={{
                        cursor: 'pointer',
                        color: quiz['_id'] === lquiz['_id'] ? 'white' : 'var(--primary-color)'
                      }}
                    />
                  ) : (
                    <DriveFileRenameOutlineIcon
                      style={{
                        cursor: 'pointer',
                        color: quiz['_id'] === lquiz['_id'] ? 'white' : 'var(--primary-color)'
                      }}
                    />
                  )}
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };
  // <div style={{
  //   fontWeight:'bolder',
  //   fontSize:'30px',
  //   color:'var(--primary-color)'
  // }}>Subtitle Title</div>
  const updateProgress =(newprgoress)=>{
    setProgress(newprgoress)
  }
  const subtitles = () => {
    return (
      <div className="my-course__subtitles">
        <div className="my-course__subtitles__content" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '95%',
              transform: 'translate(0%,-100%)'
            }}>
            <TakeNotes videoId={video['_id']} courseId={props.course['_id']} />
          </div>
          <WatchVideo updateProgress={updateProgress} video={video} courseId={props.course['_id']}/>
        </div>
        <div className="my-course__subtitles__subtitles">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '10px'
            }}>
            <div
              style={{
                color: 'var(--secondary-color)',
                fontWeight: 'bolder',
                fontSize: '20px'
              }}>
              {props.course.title}
            </div>
            <div>{getProgress()}</div>
          </div>
          {props.course.subtitles.map((subtitle) => {
            return accordion(subtitle);
          })}
        </div>
      </div>
    );
  };

  const exams = () => {
    return (
      <div className="my-course__subtitles">
        <div className="my-course__subtitles__content">
        {viewExam && (
          <ViewExam
            courseId={props.course['_id']}
            examId={quiz['_id']}
            showSolution={onChangeSolution}
          />
        )}
        {solveExam && <ExamSolution courseId={props.course['_id']} examId={quiz['_id']} />}
        </div>
        <div className="my-course__subtitles__subtitles">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '10px'
            }}>
            <div
              style={{
                color: 'var(--secondary-color)',
                fontWeight: 'bolder',
                fontSize: '20px'
              }}>
              {props.course.title + ' Exam(s)'}
            </div>
          </div>
          {props.course.subtitles.map((subtitle) => {
            return accordionExam(subtitle);
          })}

          {accordionExam2(props.course.exams)}


        </div>
      </div>
    );
  };
  const [courseRatingValue, setCourseRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const postRating = async () => {
    const res = await axios.post(
      'http://localhost:5000/courses/rate',
      { rating: courseRatingValue, review: reviewText },
      {
        params: {
          courseId: props.course['_id']
        }
      }
    );

    if (res.data.success) {
      setOpenRating(false);
      props.showAlert({ shown: true, message: 'Submitted Your Review', severity: 'success' });
    } else
      props.showAlert({ shown: true, message: 'Couldnt Submit Your Review', severity: 'error' });
  };

  const getContent = () => {
    if (value === 0) return subtitles();
    if (value === 1) return exams();
    return <div>hi</div>;
  };
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Modal
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}>
        <div
          style={{
            borderRadius: '10px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '70%',
            position: 'absolute',
            left: '50%',
            top: '35%',
            transform: 'translate(-50%,-35%)',
            color: 'black'
          }}>
          {getReport()}
        </div>
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
            flexDirection: 'column',
            width: '40%',
            height: 'fit-content',
            padding: '50px',
            position: 'absolute',
            left: '50%',
            top: '35%',
            transform: 'translate(-50%,-35%)',
            color: 'black'
          }}>
          <div
            style={{
              color: 'var(--primary-color)',
              fontWeight: 'bolder',
              fontSize: '30px',
              paddingBottom: '30px'
            }}>
            Rate This Course
          </div>
          <div>
            <Rating
              name="rating-the-couse"
              value={courseRatingValue}
              onChange={(event, newValue) => {
                setCourseRatingValue(newValue);
              }}
              sx={{ width: '100%', height: '100%', fontSize: '1.5vw' }}
            />
            <TextField
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Review"
              variant="outlined"
              multiline
              rows={4}
            />
            <div style={{ paddingTop: '30px' }}>
              <PrimaryBtn function={postRating} btnText="Send Review" />
            </div>
          </div>
        </div>
      </Modal>
      <div
        style={{
          background: 'var(--cool-grey)',
          position: 'absolute',
          bottom: '0',
          width: '100%',
          zIndex:'500'
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
            width: '150px'
          }}>
          Report Problem <ReportGmailerrorredIcon />
        </div>
        <BottomNavigation
          showLabels
          value={value}
          style={{ background: 'var(--cool-grey)', borderTop: '0.5px solid grey' }}
          onChange={(event, newValue) => {
            handleMenuChange(newValue);
            if (examExists() !== null && (examExists().solved)) {
              console.log('changed to sol')
              onChangeSolution(true);
            } else {
              console.log('didnt change to sol')

              onChangeView(true);
            }
          }}>
          <BottomNavigationAction label="Subtitles" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Exercises" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </div>
      <div
        className="content"
        style={{ position: 'relative', height: '95%', width: '100%', overflow: 'scroll' }}>
        {getContent()}
      </div>
    </div>
  );
}

export default connect(null, { showAlert })(TraineeViewMyCourse);
