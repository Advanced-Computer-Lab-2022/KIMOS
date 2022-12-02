import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { flexbox, minHeight } from '@mui/system';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {AppBar,Grid,Grow,Container} from '@mui/material';
import useStyles from '../styles/traineeViewMyCourse.scss';
import {motion} from 'framer-motion';
import Accordion from './accordionExercise.js';
import AccordionSubtitle from './accordionSubtitle.js';

export default function TraineeViewMyCourse() {
    const [course,setCourse]=useState([]);
    const [value, setValue] = useState(3);
    const [isExerciseOpen, setIsExerciseOpen] = useState([false,false]);
    var subTitleCount=1;
    var exerciseCount=1;

    const[myCourse,setMyCourse]=useState({
      title:'',
      subtitles:[],
      price:'',
      summary:'',
      rating:0,
      totalHours:'',
      discout:'',
      subject:'',
      instructor:"",
      exams:[]
  });

    const getCourse=async()=>{await axios.get("http://localhost:5000/courses", {
      params: {
        courseId: "638281a7b05c30a726283c28",
        userId:"63811834d00e598aac52a58a"
      }
    }).then((course)=>{
      console.log(course.data);
      setMyCourse(course.data);
      
  })}

    useEffect(()=>{
        getCourse();
        
    },[myCourse])

  return (
    <>
    <div className='user-course'>
      <div className='user-course__header'>
        <div className='user-course__header__left'>
          <div className='user-course__header__left__title'>
            <h1 >{myCourse.title}</h1>
          </div>

          {/* summary */}
          <div className='user-course__header__left__summary'>
            <p > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam ac imperdiet accumsan. Phasellus varius neque vel dolor accumsan, eget hendrerit tellus congue. this is a static summary because myCourse.summary is missing</p>
          </div>

          <div className="user-course__header__left__extras">
            {/* Total Hours */}
              <div className="user-course__header__left__extras__hours"> <span style={{fontWeight:'bolder'}}>Total Hours</span> {myCourse.totalHours} hour(s)</div>

            {/* Instructor Name */}
              <div className="user-course__header__left__extras__instructor"><span style={{fontWeight:'bolder'}}>Instructor</span> {myCourse.instructor.firstName} {myCourse.instructor.lastName}</div>

            {/* Rating */}
              <div className="user-course__header__left__extras__rating">
                <div>Rating</div><Rating name="read-only" value={value}  />
              </div>

          </div>

        </div>

        <div className='user-course__header__right'>

          <div className='user-course__header__right__video'>
            <iframe 
              src={'https://www.youtube.com/embed/Rr3dcyN6Xdk'} title="preview">      
            </iframe>
          </div>

        </div>



      </div>     
      
      
      <div className='user-course__content'>
        <div className='user-course__content__section'>
          <div className='user-course__content__section__title'>Subtitle(s)</div>
          <div className='user-course__content__section__content'>
            <div className='user-course__content__section__content__accordions'>    
              {myCourse.subtitles.map((subtitle)=>{
                return <AccordionSubtitle title={`Subtitle ${subTitleCount++} : ${subtitle.title}`} duration={`${subtitle.hours} hrs`} link={subtitle.video.link}/>
              })}
            </div>

          
          </div>
        </div>
        <div className='user-course__content__section'>
          <div className='user-course__content__section__title'>Exercise(s)</div>
          <div className='user-course__content__section__content'>
            <div className='user-course__content__section__content__accordions'>    
              {myCourse.exams.map((exam)=>{
                return <Accordion title={`Exercise ${exerciseCount++}`} content={`Grade: ${exam.grade}`} exam={exam}/>
            })}
            </div>
          </div>
        </div>




      </div>

      </div>


    

    
    </>
  )
}
