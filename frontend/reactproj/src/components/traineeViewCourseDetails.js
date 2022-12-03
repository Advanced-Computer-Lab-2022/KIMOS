import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';

export default function TraineeViewMyCourse(props) {
  //const [current]
  const changeDisplayedContent = (index) => {
    //setCurrentContent(index);
  };
  var subTitleCount = 1;
  var exerciseCount = 1;
  return (
    <div className="App">
      <div className="questions-display">
        <div className="user-course__content">
          <div className="user-course__content__section">
            <div className="user-course__content__section__title">Subtitle(s)</div>
            <div className="user-course__content__section__content">
              <div className="user-course__content__section__content__accordions">
                {props.course.subtitles.map((subtitle) => {
                  return (
                    <AccordionSubtitle
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
                      title={`Exercise ${exerciseCount++}`}
                      solved={exam.solved}
                      content={`Grade: ${exam.grade}`}
                      exam={exam}
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
