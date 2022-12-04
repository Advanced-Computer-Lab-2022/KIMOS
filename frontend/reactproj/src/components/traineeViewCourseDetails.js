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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';

export default function TraineeViewMyCourse(props) {
  const [viewExam, setViewExam] = useState(false);
  const [value, setValue] = useState(0);

  const [solveExam, setSolveExam] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(-1);
  const [currentExam, setCurrentExam] = useState(-1);
  const onChangeExam = (newExamId) => {
    console.log('the exam id ' +newExamId);
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
    console.log(props.course.subtitles[newSubtitleId]);
  };
  const drawerContent = ()=>{
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
      )
  }
  useEffect(() => {
    console.log(props.course.subtitles)
    handleMenuChange(0);
  }, []);
  var subTitleCount = 1;
  var exerciseCount = 1;
  const handleMenuChange = (newValue)=>{
      setValue(newValue);
      if(newValue === 0){
        //show first subtitle
        onChangeSubtitle(0);

      }
      else if(newValue === 1){
        //show first exercise
        onChangeView(true);
        onChangeExam(props.course.exams[0]['_id']);


      }
  }

  const getSubs = () => {

    return (props.course.subtitles).map((subtitle, index) => {
      return(
          <div className= {`question ${currentSubtitle === index? 'selected-q':''}`} onClick={()=>{onChangeSubtitle(index)}}>
               {subtitle.title}
          </div>
      )

    });
  };
  const getExams = () => {

    return (props.course.exams).map((exam, index) => {
      return(
          <div className= {`question ${currentExam === exam['_id']? 'selected-q':''}`} onClick={()=>{onChangeView(true);onChangeExam(props.course.exams[index]['_id'])}}>
               {exam.title +' '+ index}
          </div>
      )

    });
  };
  return (
    <div style={{position:'relative'}}>
      <div style={{zIndex:'10',background:'var(--cool-grey)', position:'absolute', bottom:'0', width:'100%'}}>
        <BottomNavigation
          showLabels
          value={value}
          style={{background:'var(--cool-grey)', borderTop:'0.5px solid grey'}}
          onChange={(event, newValue) => {
              handleMenuChange(newValue);
          }}
        >
          <BottomNavigationAction label="Subtitles" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Exercises" icon={<FavoriteIcon />} />
        </BottomNavigation>   
      
      </div>


      <div className="content" style={{height:'100%', width:'100%'}}>
        {value === 1 ? (
          solveExam ? (
            <div className='with-menu-container'>
              <div className='left-options'>

 
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
                            style={{background:'red'}}
                          />
                        );
                      })}
     

    
              </div>

              <div className='right-exam'>
                <ExamSolution examId={currentExam} />
              </div>
            </div>
          ) : viewExam ? (
            
            <div className='with-menu-container'>
              <div className='left-options'>

                      {props.course.exams.map((exam) => {
                        return (
                          <Accordion
                            style={{width:'100% !important'}}
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

              <div className='right-exam' >
                  <ViewExam examId={currentExam} showSolution={onChangeSolution} />
              </div>
            </div>
          ) : (
            <></>
          )
        ) : value === 0 && props.course.subtitles[currentSubtitle]? (
          <div className='with-menu-container'>
            <div className='left-options'>
            <div className="questions-display">
            {
                getSubs()
            }
            </div>
 
            </div>

            <div className='right-video'>
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
