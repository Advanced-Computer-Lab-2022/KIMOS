import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Rating from '@mui/material/Rating';
import PrimaryButton from './buttons/primaryBtn';
import SecondaryBtn from './buttons/secondaryBtn';
import TraineeViewCourseDetails from './traineeViewCourseDetails';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';
import { textAlign } from '@mui/system';
import PrimaryBtn from './buttons/primaryBtn';
import Loading from './loadingPage';
import {connect} from 'react-redux';

import Checkout from './checkout'

function TraineeViewMyCourse() {
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
  const [loading, setLoading] = useState(true);
  const getCourse = async (courseId) => {
    // await axios.post('http://localhost:5000/login',{username:"individual",password:"individual123"})
    await axios
      .get('http://localhost:5000/courses/getMyCourse', {
        params: {
          courseId: courseId,
        }
      })
      .then((course) => {
        setLoading(false);
        setMyCourse(course.data);
      });
  };
  const { courseId } = useParams()
  useEffect(() => {

    getCourse(courseId);

  }, []);
  const goToProfile =()=>{
    var url = 'http://localhost:3000/user/instructor/'+myCourse.instructor['_id'];
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

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

  if(loading){
    return <div><Loading/ ></div>
  }
  if(viewContent){
    return (
      <TraineeViewCourseDetails course={myCourse} />
    )
  }
  else return (
    <div className="user-course" >

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
              <div className="user-course__header__left__extras__instructor" style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'space-between'}}>
                <span ><span style={{ fontWeight: 'bolder' }}>Instructor</span>
                {' '+myCourse.instructor.firstName} {myCourse.instructor.lastName}</span>
                <div style={{marginLeft:'1vw'}}><PrimaryBtn function={goToProfile} btnText="View Profile"/></div>
              </div>

              {/* Rating */}
              <div className="user-course__header__left__extras__rating">
                <div>Rating</div>
                <Rating name="read-only" value={myCourse.averageRating ?myCourse.averageRating.value: 0} readOnly />
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
          <Checkout courseId={myCourse['_id']}/>
        </div>
      </div>
  )

}

const mapStateToProps = (state) =>{
   
  return {
      user: state.user
  };
}


export default connect(mapStateToProps)(TraineeViewMyCourse)

