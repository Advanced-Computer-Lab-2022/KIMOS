import React, { useState, useEffect } from 'react';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';
import ExamSolution from './TraineeSolution.js';
import WatchVideo from './watchVideo.js';
import ViewExam from './TraineeExercise.js';

export default function TraineeViewMyCourse(props) {
  const [viewExam, setViewExam] = useState(false);
  const [solveExam, setSolveExam] = useState(false);
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
    console.log(newSubtitleId);
    setCurrentSubtitle(newSubtitleId);
    setCurrentExam(-1);
    console.log(props.course.subtitles[newSubtitleId]);
  };
  useEffect(() => {
    console.log(props);
  }, []);
  var subTitleCount = 1;
  var exerciseCount = 1;
  return (
    <div className="App">
      <div className="content">
        {currentExam !== -1 ? (
          solveExam ? (
            <ExamSolution examId={currentExam} />
          ) : viewExam ? (
            <ViewExam examId={currentExam} showSolution={onChangeSolution} />
          ) : (
            <></>
          )
        ) : currentSubtitle !== -1 ? (
          <WatchVideo
            link={props.course.subtitles[currentSubtitle].video.link}
            description={props.course.subtitles[currentSubtitle].video.description}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="questions-display">
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
    </div>
  );
}
