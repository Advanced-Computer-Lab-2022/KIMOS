import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import PrimaryButton from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import TraineeViewCourseDetails from './traineeViewCourseDetails';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';
import { textAlign } from '@mui/system';

export default function TraineeViewMyCourse() {
  var subTitleCount = 1;
  var exerciseCount = 1;

  const [myCourse, setMyCourse] = useState({
    title: '',
    subtitles: [],
    price: '',
    summary: '',
    averageRating: 0,
    totalHours: '',
    discount: '',
    subject: '',
    instructor: '',
    exams: []
  });

  const [viewContent, setViewContent] = useState(false);

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

  // const postRating = async () => {
  //   await axios
  //     .post(
  //       'http://localhost:5000/courses/rate',
  //       { userRating },
  //       {
  //         params: {
  //           courseId: '638281a7b05c30a726283c28',
  //           userId: '63811834d00e598aac52a58a'
  //         }
  //       }
  //     )
  //     .then((rating) => {
  //       setUserRating(rating.data.userRating);
  //       setAverageRating(rating.data.averageRating);
  //     });
  // };

  useEffect(() => {
    getCourse();
    console.log(myCourse.averageRating);
  }, []);

  return (
    <>
      {viewContent ? (
        <TraineeViewCourseDetails course={myCourse} />
      ) : (
        <>
          <div className="user-course">
            <div className="user-course__header">
              <div className="user-course__header__left">
                <div className="user-course__header__left__title">
                  <h1>{myCourse.title}</h1>
                </div>
                {/* summary */}
                <div className="user-course__header__left__summary">
                  <p>{myCourse.summary}</p>
                </div>

                <div className="user-course__header__left__extras">
                  {/* Total Hours */}
                  <div className="user-course__header__left__extras__hours">
                    {' '}
                    <span style={{ fontWeight: 'bolder' }}>Total Hours</span> {myCourse.totalHours}{' '}
                    hour(s)
                  </div>

                  {/* Instructor Name */}
                  <div className="user-course__header__left__extras__instructor">
                    <span style={{ fontWeight: 'bolder' }}>Instructor</span>{' '}
                    {myCourse.instructor.firstName} {myCourse.instructor.lastName}
                  </div>

                  {/* Rating */}
                  <div className="user-course__header__left__extras__rating">
                    <div>Rating</div>
                    <Rating name="read-only" value={myCourse.averageRating} readOnly />
                  </div>
                </div>
              </div>

              <div className="user-course__header__right">
                <div className="user-course__header__right__video">
                  <iframe
                    src={myCourse.preview}
                    title="preview"></iframe>
                </div>
              </div>
            </div>

            <div className="user-course__content">
              <div className="user-course__content__section">
                <div className="user-course__content__section__title">Subtitle(s)</div>
                <div className="user-course__content__section__content">
                  <div className="user-course__content__section__content__accordions">
                    {myCourse.subtitles.map((subtitle, index) => {
                      return (
                        <div
                          style={{

                            marginBottom: '5px',
                            background: 'rgb(220, 226, 228)',
                            paddingLeft:'20px',
                            paddingRight:'20px',
                            paddingTop:'15px',
                            paddingBottom:'15px',
                            borderRadius:'10px',
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'

                          }}><div style={{fontWeight:'bolder'}}>{index+1}. {subtitle.title}</div> <div> {subtitle.hours} Hour(s)</div></div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="user-course__content__section">
                <div className="user-course__content__section__content">
                  <div className="user-course__content__section__title">Exercise(s)</div>
                  <div className="user-course__content__section__content__accordions">
                    {myCourse.exams.map((exam, index) => {
                      return (
                        <div
                          style={{

                            marginBottom: '5px',
                            background: 'rgb(220, 226, 228)',
                            paddingLeft:'20px',
                            paddingRight:'20px',
                            paddingTop:'15px',
                            paddingBottom:'15px',
                            borderRadius:'10px',
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'

                          }}><div style={{fontWeight:'bolder'}}>{index+1}. {exam.title}</div> </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            <SecondaryBtn
            btnText="Course Content"
            function={() => {
              setViewContent(true);
            }}
          />
          </div>
          </div>
        </>
      )}
    </>
  );
}
