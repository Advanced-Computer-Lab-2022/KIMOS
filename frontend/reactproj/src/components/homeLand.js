import React, { Component } from 'react';
import student1 from '../assets/student1.png';
import student2 from '../assets/student2.png';
import student3 from '../assets/student3.png';
import features1 from '../assets/features-1.png';
import PrimaryBtn from './buttons/primaryBtn';

import SecondedButton from './buttons/secondaryBtn';

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import QuizIcon from '@mui/icons-material/Quiz';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

import Rating from '@mui/material/Rating';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import reactCourse from '../assets/react.png';
import dataScienceCourse from '../assets/dataScience.png';
import fullStackCourse from '../assets/fullStack.png';
import pythonCourse from '../assets/python.png';
import aiCourse from '../assets/ai.png';
import javaCourse from '../assets/java.png';

import {Container,AppBar,Grow,Grid} from '@mui/material';
import PopularCourses from '../components/popularCourses';


class homeLand extends Component {

    generateFlipCard = (front, back, icon)=>{
        var flag = front === 'More Than 1000 Course';

        return (
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div><h1>{front}</h1></div>
                        <div class="flip-card-front__icons">
                            <div class="flip-card-front__icons__icon">{icon}</div>
                        </div>
                    </div>
                    <div class="flip-card-back" >
                        <p>{back}</p>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const slideLeft=()=>{
            var slider=document.getElementById('slider');
            slider.scrollLeft-=210;
        }

        const slideRight=()=>{
            var slider=document.getElementById('slider');
            slider.scrollLeft+=210;
        }
        return (
            <div className='homeland'>
                <div className='homeland__section section_1'>
                    <div className='homeland__section section_1__left'>

                        <div  className='homeland__section section_1__left__text t1'>Best Online Learning</div>
                        <div  className='homeland__section section_1__left__text t2'>Educational Academy</div>
                        <div  className='homeland__section section_1__left__text t3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget nisi sit amet sapien aliquam lacinia. Morbi tempor egestas lacus, ac facilisis eros posuere vitae. </div>
                        <div style={{marginTop:'1vh',display:'flex', justifyContent:'flex-end'}}>
                            <PrimaryBtn btnText="Join Us" function={()=>{window.location.href = '/login'}}/>
                        </div>

                    
                    </div>
                    <div className='homeland__section section_1__right'>
                    <div className='features'>
                        <div className='features__text'>Our Features!</div>
                        <ul className='ul' style={{fontSize:'22px'}}>
                            <li className='ul__text'>&#x2022; More than 1000 online course to choose from and to increase your knowledge in different fields.</li>
                            <li className='ul__text'>&#x2022; More than 5 exam(s) per course to test your knowledge</li>
                            <li className='ul__text'>&#x2022; Certified certificates</li>


                        </ul>
                    </div>

                        <div className='images'>
                            <img src={student1} alt="" className="image"/>
                            <img src={student2} alt="" className="image"/>   
                        </div>
                    </div>
                </div>


                <div className='homeland__section section_2'>
                    <div className='bg-filter'></div>
                    <div className='header'>Explore Our Features</div>
                    <div className='cards'>
                        <div className='cards__item'>
                            {this.generateFlipCard("More Than 1000 Course", "Explore many courses in different fields given by our best instructors", <ImportContactsIcon  style={{fontSize:'150px'}}/>)}
                        </div>
                        <div className='cards__item'>
                            {this.generateFlipCard("More Than 300 Exercise", "Test your knowledge by taking an online assesment and review the solution afterward!", <QuizIcon style={{fontSize:'150px'}}/>)}
                        </div>
                        <div className='cards__item'>
                            {this.generateFlipCard("Get a certified certificate", "Our certificate is certified in many countries and companies!", <CardMembershipIcon style={{fontSize:'150px'}}/>)}
                        </div>
                        <img src={features1} alt="" className="image-features"/>

                    
                    </div>
                </div>

                <div className='homeland__section section_2' >
                    <div className='bg-filter'></div>
                    <div className='header'>Explore Our Popular courses</div>
                    <PopularCourses></PopularCourses>
                </div>

                

                <div className='footer'>
                    <div style={{height:'100%',display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                        <div>Contact Us</div>
                        <div style={{marginTop:'20px'}}>
                            <div className='contact-info'>
                                <div>Email</div>
                                <div>Kimos@g.com</div>
                            </div>
                            <div className='contact-info'>
                                <div>Facebook</div>
                                <div>Kimos edu</div>
                            </div>
                            <div className='contact-info'>
                                <div>Phone Number</div>
                                <div>+20 101 895 4588</div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default homeLand;